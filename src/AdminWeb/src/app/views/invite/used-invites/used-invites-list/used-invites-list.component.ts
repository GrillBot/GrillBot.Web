import { Component, inject } from "@angular/core";
import { AsyncLookupCellRendererComponent, GuildLookupPipe, ListBaseComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, UserLookupPipe } from "../../../../components";
import { Invite, InviteListRequest } from "../../../../core/models/invite";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { InviteClient } from "../../../../core/clients/invite.client";
import { LookupClient } from "../../../../core/clients";

@Component({
  selector: 'app-used-invites-list',
  templateUrl: './used-invites-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class UsedInvitesListComponent extends ListBaseComponent<InviteListRequest, Invite> {
  readonly #client = inject(InviteClient);
  readonly #lookupClient = inject(LookupClient);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'code',
          headerName: 'Kód',
          width: 100,
          sortable: true,
          initialSort: 'asc',
          context: {
            sortKey: 'Code'
          }
        },
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
          },
        },
        {
          field: 'creatorId',
          headerName: 'Zakladatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string | null) => userId ? UserLookupPipe.processTransform(userId, this.#lookupClient) : null
          }
        },
        {
          field: 'createdAt',
          headerName: 'Vytvořeno',
          cellDataType: 'localeDatetime',
          width: 200,
          sortable: true,
          context: {
            sortKey: 'Created'
          }
        },
        {
          field: 'uses',
          headerName: 'Počet použití',
          cellDataType: 'spacedNumber',
          width: 100,
          sortable: true,
          context: {
            sortKey: 'Uses'
          }
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<InviteListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<Invite>>> {
    return this.#client.getUsedInvites(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'code',
      descending: false
    };
  }
}
