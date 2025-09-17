import { Component, inject, viewChild } from "@angular/core";
import {
  ButtonsCellRendererComponent, ListBaseComponent, ModalComponent, ModalQuestionButtonsComponent, PaginatedGridComponent
} from "../../../../components";
import { KeepableListItem } from "../../../../core/models/unverify/keepable-list-item";
import { KeepablesListFilter, KeepablesListRequest } from "../../../../core/models/unverify/keepables-list-request";
import { UnverifyClient } from "../../../../core/clients";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { ButtonDef } from "../../../../components/button/button.models";
import { TableDirective } from "@coreui/angular";
import { LocaleDatePipe } from "../../../../core/pipes";

@Component({
  templateUrl: './keepables-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ModalQuestionButtonsComponent,
    TableDirective,
    LocaleDatePipe
  ]
})
export class KeepablesListComponent extends ListBaseComponent<KeepablesListFilter, KeepableListItem> {
  readonly #client = inject(UnverifyClient);

  deleteConfirmModal = viewChild<ModalComponent>('deleteConfirmModal');
  rowInModal?: KeepableListItem;

  actionButtons: ButtonDef[] = [
    {
      id: 'create-keepable',
      title: 'Vytvořit',
      variant: 'outline',
      color: 'primary',
      redirectTo: '/web/unverify/keepables/create',
      icon: 'cil-plus'
    }
  ];

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'group',
          headerName: 'Skupina',
          sortable: true,
          sort: 'asc',
          context: {
            sortingKey: 'Group'
          }
        },
        {
          field: 'name',
          headerName: 'Název',
          sortable: true,
          context: {
            sortingKey: 'Name'
          }
        },
        {
          field: 'createdAtUtc',
          headerName: 'Založeno',
          cellDataType: 'localeDatetime',
          sortable: true,
          context: {
            sortingKey: 'Created'
          }
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'delete-keepable',
            title: 'Smazat',
            color: 'danger',
            action: row => this.deleteConfirmModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            )
          }
        ])
      ]
    }
  }

  override createRequest(request: WithSortAndPagination<KeepablesListFilter>):
    Observable<RawHttpResponse<PaginatedResponse<KeepableListItem>>> {
    const filterRequest: WithSortAndPagination<KeepablesListRequest> = {
      createdFrom: request.created?.from ?? null,
      createdTo: request.created?.to ?? null,
      group: request.group,
      pagination: request.pagination,
      sort: request.sort
    };

    return this.#client.getKeepablesList(filterRequest);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'Group',
      descending: false
    };
  }

  confirmKeepableDeletion() {
    const modal = this.deleteConfirmModal();

    if (!modal || !this.rowInModal) {
      return;
    }

    this.#client.deleteKeepables(this.rowInModal.group, this.rowInModal.name).subscribe(() => {
      modal.close();
      this.reload();
    });
  }
}
