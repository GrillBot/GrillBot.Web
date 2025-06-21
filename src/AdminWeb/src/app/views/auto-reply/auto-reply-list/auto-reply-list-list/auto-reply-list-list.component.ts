import { Component, inject, viewChild } from "@angular/core";
import { ButtonsCellRendererComponent, CheckboxCellRenderer, ListBaseComponent, ModalComponent, PaginatedGridComponent } from "../../../../components";
import { AutoReplyDefinition, AutoReplyDefinitionListRequest } from "../../../../core/models/message";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { MessageClient } from "../../../../core/clients/message.client";

@Component({
  selector: 'app-auto-reply-list-list',
  templateUrl: './auto-reply-list-list.component.html',
  standalone: true,
  imports: [PaginatedGridComponent]
})
export class AutoReplyListListComponent extends ListBaseComponent<AutoReplyDefinitionListRequest, AutoReplyDefinition> {
  readonly #client = inject(MessageClient);

  rowInModal?: AutoReplyDefinition;
  deleteModal = viewChild<ModalComponent>('deleteModal');

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'id',
          headerName: 'ID',
          width: 150
        },
        {
          field: 'template',
          headerName: 'Šablona',
          width: 300,
          resizable: true,
          tooltipField: 'template'
        },
        {
          field: 'reply',
          headerName: 'Odpověď',
          width: 300,
          resizable: true,
          tooltipField: 'reply',
        },
        CheckboxCellRenderer.createColDef('isDisabled', 'Deaktivováno', { width: 150 }),
        CheckboxCellRenderer.createColDef('isCaseSensitive', 'Rozlišovat velikost písmen', { width: 150 }),
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'detail',
            title: 'Detail',
            color: 'primary',
            redirectTo: row => `/admin/auto-reply/${row.id}`
          },
          {
            id: 'delete',
            title: 'Smazat',
            color: 'danger',
            action: row => this.deleteModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            ),
          }
        ])
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<AutoReplyDefinitionListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<AutoReplyDefinition>>> {
    return this.#client.getAutoReplyDefinitionList(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'template',
      descending: false
    }
  }
}
