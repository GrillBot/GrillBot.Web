import { Component, inject } from "@angular/core";
import { UserListRequest } from "../../../../core/models/points/user-list-request";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { RawHttpResponse, PaginatedResponse, SortParameters, WithSortAndPagination } from "../../../../core/models/common";
import { PointsClient } from "../../../../core/clients/points.client";
import { LookupClient } from "../../../../core/clients/lookup.client";
import {
  AsyncLookupCellRendererComponent, CheckboxCellRenderer, GuildLookupPipe, ListBaseComponent, PaginatedGridComponent, STRIPED_ROW_STYLE,
  UserLookupPipe
} from "../../../../components";
import { UserListItem } from "../../../../core/models/points/user-list-item";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class UsersListComponent extends ListBaseComponent<UserListRequest, UserListItem> {
  readonly #pointsClient = inject(PointsClient);
  readonly #lookupClient = inject(LookupClient);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        AsyncLookupCellRendererComponent.createColDef(
          'guildId',
          'Server',
          (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient),
          {
            maxWidth: 500
          }
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        CheckboxCellRenderer.createColDef('pointsDeactivated', 'Body deaktivované', { maxWidth: 180 }),
        {
          field: 'activePoints',
          headerName: 'Aktivní body',
          maxWidth: 250,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'expiredPoints',
          headerName: 'Expirované',
          maxWidth: 250,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'mergedPoints',
          headerName: 'Expirované sloučené',
          maxWidth: 250,
          cellDataType: 'spacedNumber'
        }
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<UserListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<UserListItem>>> {
    return this.#pointsClient.getUserList(request);
  }

  override createDefaultSort(): SortParameters {
    return {};
  }
}
