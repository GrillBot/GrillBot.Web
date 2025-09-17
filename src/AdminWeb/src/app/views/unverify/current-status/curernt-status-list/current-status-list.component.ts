import { ActiveUnverifyListItemResponse } from './../../../../core/models/unverify/active-unverify-list-item-response';
import { AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, CheckboxCellRenderer, GuildLookupComponent, GuildLookupPipe, ListBaseComponent, PaginatedGridComponent, UserLookupPipe } from "../../../../components";
import { ActiveUnverifyListRequest } from "../../../../core/models/unverify/active-unverify-list-request";
import { LookupClient, UnverifyClient } from '../../../../core/clients';
import { Component, inject } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from '../../../../core/models/common';

@Component({
  templateUrl: './current-status-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class CurrentStatusListComponent extends ListBaseComponent<ActiveUnverifyListRequest, ActiveUnverifyListItemResponse> {
  readonly #client = inject(UnverifyClient);
  readonly #lookupClient = inject(LookupClient);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        CheckboxCellRenderer.createColDef('isSelfUnverify', 'Self-Unverify', { width: 130 }),
        AsyncLookupCellRendererComponent.createColDef(
          'guildId',
          'Server',
          (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'fromUserId',
          'Od uživatele',
          (userId: string | null) => userId ? UserLookupPipe.processTransform(userId, this.#lookupClient) : null
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'toUserId',
          'Cílový uživatel',
          (userId: string | null) => userId ? UserLookupPipe.processTransform(userId, this.#lookupClient) : null
        ),
        {
          field: 'startAtUtc',
          headerName: 'Začátek',
          cellDataType: 'localeDatetime',
          sortable: true,
          context: {
            sortKey: 'StartAt'
          },
          width: 200
        },
        {
          field: 'endAtUtc',
          headerName: 'Konec',
          cellDataType: 'localeDatetime',
          sortable: true,
          context: {
            sortKey: 'EndAt'
          },
          width: 200
        },
        {
          field: 'reason',
          headerName: 'Důvod',
          resizable: true,
          tooltipField: 'reason'
        },
        {
          field: 'language',
          headerName: 'Jazyk',
          width: 100
        },
        {
          field: 'removedRolesCount',
          headerName: 'Odebrané role',
          cellDataType: 'spacedNumber',
          width: 150
        },
        {
          field: 'keepedRolesCount',
          headerName: 'Ponechané role',
          cellDataType: 'spacedNumber',
          width: 150
        },
        {
          field: 'removedChannelsCount',
          headerName: 'Odebrané kanály',
          cellDataType: 'spacedNumber',
          width: 160
        },
        {
          field: 'keepedChannelsCount',
          headerName: 'Ponechané kanály',
          cellDataType: 'spacedNumber',
          width: 180
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'detail',
            title: 'Detail',
            color: 'primary',
            redirectTo: row => `/web/unverify/current-status/${row.guildId}/${row.toUserId}`
          }
        ])
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<ActiveUnverifyListRequest>):
    Observable<RawHttpResponse<PaginatedResponse<ActiveUnverifyListItemResponse>>> {
    return this.#client.getActiveUnverifyList(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      descending: false,
      orderBy: 'StartAt'
    };
  }
}
