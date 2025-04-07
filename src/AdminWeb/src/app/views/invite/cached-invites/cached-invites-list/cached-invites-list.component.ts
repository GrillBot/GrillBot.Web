import { Component, inject } from "@angular/core";
import { AsyncLookupCellRendererComponent, GuildLookupPipe, ListBaseComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, UserLookupPipe } from "../../../../components";
import { Invite, InviteListRequest } from "../../../../core/models/invite";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { InviteClient } from "../../../../core/clients/invite.client";
import { LookupClient } from "../../../../core/clients";

@Component({
  selector: 'app-cached-invites-list',
  templateUrl: './cached-invites-list.component.html',
  standalone: true,
  imports: [PaginatedGridComponent]
})
export class CachedInvitesListComponent extends ListBaseComponent<InviteListRequest, Invite> {
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
          headerName: 'Vygenerováno',
          cellDataType: 'localeDatetime',
          width: 200,
          sortable: true,
          context: {
            sortKey: 'Created'
          }
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<InviteListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<Invite>>> {
    return this.#client.getCachedInvites(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'code',
      descending: false
    };
  }
}
