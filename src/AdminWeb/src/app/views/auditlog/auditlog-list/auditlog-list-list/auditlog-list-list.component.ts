import { Component, inject, isDevMode } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, ChannelLookupPipe, GuildLookupPipe,
  ListBaseComponent, PaginatedGridComponent, UserLookupPipe
} from "../../../../components";
import { FormSearchRequest, LogListItem, SearchRequest } from "../../../../core/models/audit-log";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { mapAuditLogSearchRequest } from "../../../../core/mappers/auditlog.mapper";
import { AuditLogClient, LookupClient } from "../../../../core/clients";
import { AuditLogType, AuditLogTypeLocalization } from "../../../../core/enums/audit-log-type";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auditlog-list-list',
  templateUrl: './auditlog-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class AuditLogListListComponent extends ListBaseComponent<FormSearchRequest, LogListItem> {
  readonly #client = inject(AuditLogClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #router = inject(Router);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'id',
          headerName: 'ID',
          tooltipField: 'id'
        },
        {
          field: 'type',
          headerName: 'Typ',
          maxWidth: 250,
          valueFormatter: params => (AuditLogTypeLocalization as any)[AuditLogType[params.value]]
        },
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string | null) => guildId ? GuildLookupPipe.processTransform(guildId, this.#lookupClient) : null
          },
          maxWidth: 300
        },
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) => userId ? UserLookupPipe.processTransform(userId, this.#lookupClient) : null
          }
        },
        {
          field: 'channelId',
          headerName: 'Kanál',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (channelId: string) => channelId ? ChannelLookupPipe.processTransform(channelId, this.#lookupClient) : null
          }
        },
        {
          field: 'createdAt',
          headerName: 'Vytvořeno',
          maxWidth: 200,
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
          maxWidth: 110,
          valueFormatter: params => params.value.length,
          cellDataType: 'spacedNumber'
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          maxWidth: 300,
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'show-preview',
                title: 'Náhled',
                action: row => alert(row),
                size: 'sm',
                variant: 'ghost',
                color: 'primary'
              },
              {
                id: 'detail',
                title: 'Detail',
                action: (row: LogListItem) => this.#router.navigate(['/web/auditlog/', row.id]),
                size: 'sm',
                variant: 'ghost',
                isVisible: (row: LogListItem) => row.isDetailAvailable,
                color: 'primary'
              },
              {
                id: 'remove',
                title: 'Smazat',
                action: (row: LogListItem) => alert(row),
                size: 'sm',
                color: 'danger'
              }
            ] as ButtonDef[]
          }
        }
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
}
