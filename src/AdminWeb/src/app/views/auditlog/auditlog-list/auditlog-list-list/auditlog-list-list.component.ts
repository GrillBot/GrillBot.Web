import { Component, inject, isDevMode, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, ChannelLookupPipe, GuildLookupPipe,
  ListBaseComponent, ModalComponent, PaginatedGridComponent, UserLookupPipe
} from "../../../../components";
import { FormSearchRequest, LogListItem, SearchRequest } from "../../../../core/models/audit-log";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { mapAuditLogSearchRequest } from "../../../../core/mappers/auditlog.mapper";
import { AuditLogClient, LookupClient } from "../../../../core/clients";
import { AuditLogType, AuditLogTypeLocalization } from "../../../../core/enums/audit-log-type";
import { Router } from "@angular/router";
import { ButtonDirective } from "@coreui/angular";
import { PreviewCellRendererComponent } from "./preview-cell-renderer/preview-cell-renderer.component";

@Component({
  selector: 'app-auditlog-list-list',
  templateUrl: './auditlog-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ButtonDirective
  ]
})
export class AuditLogListListComponent extends ListBaseComponent<FormSearchRequest, LogListItem> {
  readonly #client = inject(AuditLogClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #router = inject(Router);

  removeItemModal = viewChild<ModalComponent>('removeItemModal');
  rowInModal?: LogListItem;

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'id',
          headerName: 'ID',
          tooltipField: 'id',
          resizable: true,
          width: 150
        },
        {
          field: 'type',
          headerName: 'Typ',
          width: 230,
          resizable: true,
          valueFormatter: params => (AuditLogTypeLocalization as any)[AuditLogType[params.value]]
        },
        AsyncLookupCellRendererComponent.createColDef(
          'guildId',
          'Server',
          (guildId: string | null) => guildId ? GuildLookupPipe.processTransform(guildId, this.#lookupClient) : null,
          {
            resizable: true,
            width: 300
          }
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => userId ? UserLookupPipe.processTransform(userId, this.#lookupClient) : null,
          {
            resizable: true,
            width: 300
          }
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'channelId',
          'Kanál',
          (channelId: string) => channelId ? ChannelLookupPipe.processTransform(channelId, this.#lookupClient) : null,
          {
            resizable: true,
            width: 300
          }
        ),
        {
          field: 'createdAt',
          headerName: 'Vytvořeno',
          resizable: true,
          width: 200,
          sortable: true,
          initialSort: 'desc',
          context: {
            sortingKey: 'CreatedAt'
          },
          cellDataType: 'localeDatetime'
        },
        {
          field: 'files',
          headerName: 'Souborů',
          width: 100,
          resizable: true,
          valueFormatter: params => params.value.length,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'preview',
          headerName: 'Náhled',
          resizable: true,
          cellRenderer: PreviewCellRendererComponent
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'detail',
            title: 'Detail',
            action: (row: LogListItem) => this.#router.navigate(['/web/auditlog/', row.id]),
            isVisible: (row: LogListItem) => row.isDetailAvailable,
            color: 'primary'
          },
          {
            id: 'remove',
            title: 'Smazat',
            action: (row: LogListItem) => this.removeItemModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            ),
            color: 'danger'
          }
        ])
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<FormSearchRequest>): Observable<RawHttpResponse<PaginatedResponse<LogListItem>>> {
    const searchRequest: WithSortAndPagination<SearchRequest> = {
      ...mapAuditLogSearchRequest(request),
      pagination: request.pagination,
      sort: request.sort
    };

    if (isDevMode()) {
      console.log('Requesting AuditLog with mapped filter', searchRequest);
    }

    return this.#client.searchItems(searchRequest);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'CreatedAt',
      descending: true
    };
  }

  confirmItemRemove(): void {
    const modal = this.removeItemModal();

    if (modal && this.rowInModal) {
      this.#client.deleteItem(this.rowInModal.id).subscribe(() => {
        modal.close();
        this.reload();
      });
    }
  }
}
