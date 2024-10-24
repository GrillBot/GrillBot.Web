import { Component, inject } from "@angular/core";
import { UserListRequest } from "../../../../core/models/points/user-list-request";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { RawHttpResponse, PaginatedResponse, SortParameters, WithSortAndPagination } from "../../../../core/models/common";
import { PointsClient } from "../../../../core/clients/points.client";
import { HttpErrorResponse } from "@angular/common/http";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { mapGuildToLookupRow, mapUserToLookupRow } from "../../../../core/mappers/lookup.mapper";
import * as rxjs from 'rxjs';
import { Guild } from "../../../../core/models/guilds/guild";
import { User } from "../../../../core/models/users/user";
import { SpacedNumberPipe } from "../../../../core/pipes";
import {
  AsyncLookupCellRendererComponent, CheckboxCellRenderer, ListBaseComponent, PaginatedGridComponent, usePipeTransform
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
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) =>
              this.#lookupClient.resolveGuild(guildId).pipe(
                rxjs.catchError((err: HttpErrorResponse) => err.status == 404 ? rxjs.of(null as Guild | null) : rxjs.throwError(() => err)),
                rxjs.map(guild => mapGuildToLookupRow(guild, guildId))
              )
          },
          maxWidth: 500
        },
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) =>
              this.#lookupClient.resolveUser(userId).pipe(
                rxjs.catchError((err: HttpErrorResponse) => err.status == 404 ? rxjs.of(null as User | null) : rxjs.throwError(() => err)),
                rxjs.map(user => mapUserToLookupRow(user, userId)),
              )
          }
        },
        {
          field: 'pointsDeactivated',
          headerName: 'Body deaktivované',
          cellRenderer: CheckboxCellRenderer,
          maxWidth: 180
        },
        {
          field: 'activePoints',
          headerName: 'Aktivní body',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 250
        },
        {
          field: 'expiredPoints',
          headerName: 'Expirované',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 250
        },
        {
          field: 'mergedPoints',
          headerName: 'Expirované sloučené',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          maxWidth: 250
        }
      ]
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
