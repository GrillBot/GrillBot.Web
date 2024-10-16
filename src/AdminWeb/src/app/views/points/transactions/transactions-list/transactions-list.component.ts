import { Component, inject, LOCALE_ID, viewChild } from "@angular/core";
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
import { DatePipe } from "@angular/common";
import { SpacedNumberPipe } from "../../../../core/pipes";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class TransactionsListComponent {
  readonly #pointsClient = inject(PointsClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  grid = viewChild<PaginatedGridComponent>('grid');

  gridOptions: GridOptions;
  filter!: AdminListRequest;

  constructor() {
    this.gridOptions = {
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
          }
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
          valueFormatter: params => new DatePipe(this.#LOCALE_ID).transform(params.value, 'dd. MM. yyyy HH:mm:ss')!,
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
          valueFormatter: params => new DatePipe(this.#LOCALE_ID).transform(params.value, 'dd. MM. yyyy HH:mm:ss')!,
          maxWidth: 200,
          hide: true
        },
        {
          field: 'mergedTo',
          headerName: 'Sloučeno do',
          valueFormatter: params => new DatePipe(this.#LOCALE_ID).transform(params.value, 'dd. MM. yyyy HH:mm:ss')!,
          maxWidth: 200,
          hide: true
        }
      ]
    };
  }

  onFilterChanged(filter: AdminListRequest) {
    this.filter = filter;
    this.reload();
  }

  reload(): void {
    this.grid()?.loadData(
      this.filter,
      request => this.#pointsClient.getTransactionList(request).pipe(
        rxjs.filter(res => res.type === 'finish'),
        rxjs.map(res => res.value!)
      ),
      { descending: true }
    );
  }

  onRowsUpdated(event: RowDataUpdatedEvent): void {
    event.api.setColumnsVisible(['mergedCount', 'mergedFrom', 'mergedTo'], this.filter.showMerged);
    event.api.sizeColumnsToFit();
  }
}
