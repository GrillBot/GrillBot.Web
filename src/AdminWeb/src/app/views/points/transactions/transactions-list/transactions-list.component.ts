import { Component, inject, LOCALE_ID } from "@angular/core";
import { AdminListRequest } from "../../../../core/models/points/admin-list-request";
import { GridOptions, RowDataUpdatedEvent } from "ag-grid-community";
import { PaginatedGridComponent } from "../../../../components/paginated-grid/paginated-grid.component";
import { PointsClient } from "../../../../core/clients/points.client";
import * as rxjs from "rxjs";
import { AsyncLookupCellRendererComponent, usePipeTransform } from "../../../../components";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { Guild } from "../../../../core/models/guilds/guild";
import { HttpErrorResponse } from "@angular/common/http";
import { mapGuildToLookupRow, mapUserToLookupRow } from "../../../../core/mappers/lookup.mapper";
import { User } from "../../../../core/models/users/user";
import { SpacedNumberPipe } from "../../../../core/pipes";
import { ListBaseComponent } from "../../../../components/list.component.base";
import { TransactionItem } from "../../../../core/models/points/transaction-item";
import { RawHttpResponse, PaginatedResponse, SortParameters, WithSortAndPagination } from "../../../../core/models/common";
import { Observable } from "rxjs";
import { LocaleDatePipe } from "../../../../core/pipes/locale-date.pipe";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class TransactionsListComponent extends ListBaseComponent<AdminListRequest, TransactionItem> {
  readonly #pointsClient = inject(PointsClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

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
          field: 'createdAt',
          headerName: 'Vytvořeno',
          valueFormatter: params => LocaleDatePipe.transformValue(params.value, 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID),
          maxWidth: 200,
          sortable: true,
          initialSort: 'desc'
        },
        {
          field: 'messageId',
          headerName: 'ID zprávy',
          maxWidth: 250
        },
        {
          field: 'reactionId',
          headerName: 'Typ',
          valueFormatter: params => {
            if (String(params.value).endsWith('_Burst')) {
              return 'Super reakce';
            } else if (String(params.value).length > 0) {
              return 'Reakce';
            } else {
              return 'Zpráva';
            }
          },
          maxWidth: 110
        },
        {
          field: 'value',
          headerName: 'Hodnota',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          sortable: true
        },
        {
          field: 'mergedCount',
          headerName: 'Sloučených',
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          hide: true
        },
        {
          field: 'mergedFrom',
          headerName: 'Sloučeno od',
          valueFormatter: params => LocaleDatePipe.transformValue(params.value, 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID),
          maxWidth: 200,
          hide: true
        },
        {
          field: 'mergedTo',
          headerName: 'Sloučeno do',
          valueFormatter: params => LocaleDatePipe.transformValue(params.value, 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID),
          maxWidth: 200,
          hide: true
        }
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<AdminListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<TransactionItem>>> {
    return this.#pointsClient.getTransactionList(request);
  }

  override createDefaultSort(): SortParameters {
    return { descending: true };
  }

  onRowsUpdated(event: RowDataUpdatedEvent): void {
    event.api.setColumnsVisible(['mergedCount', 'mergedFrom', 'mergedTo'], this.filter.showMerged);
    event.api.sizeColumnsToFit();
  }
}
