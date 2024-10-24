import { Component, inject, LOCALE_ID, viewChild } from "@angular/core";
import { AdminListRequest } from "../../../../core/models/points/admin-list-request";
import { GridOptions, RowDataUpdatedEvent } from "ag-grid-community";
import { PointsClient } from "../../../../core/clients/points.client";
import * as rxjs from "rxjs";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, ListBaseComponent,
  PaginatedGridComponent, usePipeTransform
} from "../../../../components";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { Guild } from "../../../../core/models/guilds/guild";
import { HttpErrorResponse } from "@angular/common/http";
import { mapGuildToLookupRow, mapUserToLookupRow } from "../../../../core/mappers/lookup.mapper";
import { User } from "../../../../core/models/users/user";
import { SpacedNumberPipe, LocaleDatePipe } from "../../../../core/pipes";
import { TransactionItem } from "../../../../core/models/points/transaction-item";
import { RawHttpResponse, PaginatedResponse, SortParameters, WithSortAndPagination } from "../../../../core/models/common";
import {
  ButtonCloseDirective, ButtonDirective, TableDirective,
  ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective
} from "@coreui/angular";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ModalTitleDirective,
    ButtonCloseDirective,
    TableDirective,
    LocaleDatePipe,
    ButtonDirective
  ]
})
export class TransactionsListComponent extends ListBaseComponent<AdminListRequest, TransactionItem> {
  readonly #pointsClient = inject(PointsClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  removeTransactionModal = viewChild<ModalComponent>('removeTransactionModal');
  rowInModal?: TransactionItem;

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
          valueFormatter: params => this.getType(params.value),
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
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          maxWidth: 200,
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'remove-transaction',
                title: 'Smazat transakci',
                action: (row) => this.openRemoveTransaction(row),
                size: 'sm',
                variant: 'ghost',
                color: 'primary'
              } as ButtonDef,
            ]
          }
        }
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<AdminListRequest>)
    : rxjs.Observable<RawHttpResponse<PaginatedResponse<TransactionItem>>> {
    return this.#pointsClient.getTransactionList(request);
  }

  override createDefaultSort(): SortParameters {
    return { descending: true };
  }

  onRowsUpdated(event: RowDataUpdatedEvent): void {
    event.api.setColumnsVisible(['mergedCount', 'mergedFrom', 'mergedTo'], this.filter.showMerged);
    event.api.setColumnsVisible(['actions'], !this.filter.showMerged);
    event.api.sizeColumnsToFit();
  }

  openRemoveTransaction(row: TransactionItem) {
    const modal = this.removeTransactionModal();
    if (!modal) {
      return;
    }

    this.rowInModal = row;
    modal.visible = true;

    const visibleChange = modal.visibleChange
      .pipe(rxjs.filter(visible => !visible))
      .subscribe(() => {
        this.rowInModal = undefined;
        visibleChange.unsubscribe();
      });
  }

  confirmRemoveTransaction() {
    const modal = this.removeTransactionModal();
    if (!this.rowInModal || !modal) {
      return;
    }

    this.#pointsClient
      .deleteTransaction(this.rowInModal.guildId, this.rowInModal.messageId, this.rowInModal.reactionId)
      .subscribe(() => {
        modal.visible = false;
        this.reload();
      });
  }

  getType(reactionId: string): string {
    if (reactionId.endsWith('_Burst')) {
      return 'Super reakce';
    } else if (reactionId.length > 0) {
      return 'Reakce';
    } else {
      return 'Zpráva';
    }
  }
}
