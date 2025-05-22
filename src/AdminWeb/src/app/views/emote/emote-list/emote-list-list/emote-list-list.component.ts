import { Component, inject } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, CheckboxCellRenderer,
  GuildLookupPipe, ImageCellRendererComponent, ListBaseComponent, PaginatedGridComponent, STRIPED_ROW_STYLE
} from "../../../../components";
import { GridOptions, RowDataUpdatedEvent } from "ag-grid-community";
import * as rxjs from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { Router } from "@angular/router";
import { EmoteClient, LookupClient } from "../../../../core/clients";
import { EmoteStatisticsItem, EmoteStatisticsListFilter, EmoteStatisticsListRequest } from "../../../../core/models/emote";

@Component({
  selector: 'app-emote-list-list',
  templateUrl: './emote-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class EmoteListListComponent extends ListBaseComponent<EmoteStatisticsListFilter, EmoteStatisticsItem> {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #router = inject(Router);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'emoteUrl',
          headerName: 'Emote',
          cellRenderer: ImageCellRendererComponent,
          cellRendererParams: {
            width: 64,
            height: 64
          },
          maxWidth: 100
        },
        {
          field: 'emoteId',
          headerName: 'ID',
          maxWidth: 200,
          hide: true
        },
        {
          field: 'emoteIsAnimated',
          headerName: 'Animovaný',
          cellRenderer: CheckboxCellRenderer,
          maxWidth: 150,
          hide: true
        },
        {
          field: 'emoteName',
          headerName: 'Název'
        },
        {
          field: 'useCount',
          headerName: 'Počet použití',
          cellDataType: 'spacedNumber',
          maxWidth: 160,
          sortable: true,
          context: {
            sortingKey: 'UseCount'
          }
        },
        {
          field: 'firstOccurence',
          headerName: 'Prvně použito',
          cellDataType: 'localeDatetime',
          maxWidth: 200,
          sortable: true,
          context: {
            sortingKey: 'FirstOccurence'
          }
        },
        {
          field: 'lastOccurence',
          headerName: 'Naposledy použito',
          cellDataType: 'localeDatetime',
          maxWidth: 200,
          sortable: true,
          context: {
            sortingKey: 'LastOccurence'
          }
        },
        {
          field: 'usersCount',
          headerName: 'Použilo uživatelů',
          cellDataType: 'spacedNumber',
          maxWidth: 180,
          sortable: true,
          context: {
            sortingKey: 'UsersCount'
          }
        },
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
          },
          maxWidth: 500
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'show-detail',
                title: 'Detail',
                color: 'primary',
                action: row => this.openDetail(row)
              }
            ] as ButtonDef[]
          },
          maxWidth: 200
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    }
  }

  override createRequest(request: WithSortAndPagination<EmoteStatisticsListFilter>)
    : rxjs.Observable<RawHttpResponse<PaginatedResponse<EmoteStatisticsItem>>> {
    const requestData: WithSortAndPagination<EmoteStatisticsListRequest> = {
      emoteFullId: request.emoteFullId,
      emoteName: request.emoteName,
      guildId: request.guildId,
      ignoreAnimated: request.ignoreAnimated,
      firstOccurenceFrom: request.firstOccurence?.from ?? null,
      firstOccurenceTo: request.firstOccurence?.to ?? null,
      lastOccurenceFrom: request.lastOccurence?.from ?? null,
      lastOccurenceTo: request.lastOccurence?.to ?? null,
      pagination: request.pagination,
      sort: request.sort,
      unsupported: request.unsupported,
      useCountFrom: request.useCountFrom,
      useCountTo: request.useCountTo,
      userId: request.userId
    };

    return this.#client.getEmoteStatisticsList(requestData);
  }

  override createDefaultSort(): SortParameters {
    return {
      descending: true,
      orderBy: 'UseCount'
    };
  }

  onRowsUpdated(event: RowDataUpdatedEvent): void {
    event.api.setColumnsVisible(['emoteId', 'emoteIsAnimated'], this.filter.unsupported);
    event.api.setColumnsVisible(['emoteUrl'], !this.filter.unsupported);
    event.api.sizeColumnsToFit();
  }

  openDetail(row: EmoteStatisticsItem): void {
    const emoteId = encodeURIComponent(`<${(row.emoteIsAnimated ? 'a' : '')}:${row.emoteName}:${row.emoteId}>`);
    this.#router.navigateByUrl(`/web/emote/stats/${row.guildId}/${emoteId}`);
  }
}
