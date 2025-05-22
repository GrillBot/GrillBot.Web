import { Component, inject, viewChild } from "@angular/core";
import { AdminListFilter, AdminListRequest } from "../../../../core/models/points/admin-list-request";
import { GridOptions, RowDataUpdatedEvent } from "ag-grid-community";
import { PointsClient } from "../../../../core/clients/points.client";
import * as rxjs from "rxjs";
import {
  AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, GuildLookupPipe, ListBaseComponent, ModalComponent,
  PaginatedGridComponent, STRIPED_ROW_STYLE, UserLookupPipe
} from "../../../../components";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { LocaleDatePipe } from "../../../../core/pipes";
import { TransactionItem } from "../../../../core/models/points/transaction-item";
import { RawHttpResponse, PaginatedResponse, SortParameters, WithSortAndPagination } from "../../../../core/models/common";
import { ButtonDirective, TableDirective } from "@coreui/angular";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    TableDirective,
    LocaleDatePipe,
    ButtonDirective,
    GuildLookupPipe,
    UserLookupPipe,
    AsyncPipe
  ]
})
export class TransactionsListComponent extends ListBaseComponent<AdminListFilter, TransactionItem> {
  readonly #pointsClient = inject(PointsClient);
  readonly #lookupClient = inject(LookupClient);

  removeTransactionModal = viewChild<ModalComponent>('removeTransactionModal');
  rowInModal?: TransactionItem;

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
        {
          field: 'createdAt',
          headerName: 'Vytvořeno',
          maxWidth: 200,
          sortable: true,
          initialSort: 'desc',
          cellDataType: 'localeDatetime'
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
          sortable: true,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'mergedCount',
          headerName: 'Sloučených',
          hide: true,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'mergedFrom',
          headerName: 'Sloučeno od',
          maxWidth: 200,
          hide: true,
          cellDataType: 'localeDatetime'
        },
        {
          field: 'mergedTo',
          headerName: 'Sloučeno do',
          maxWidth: 200,
          hide: true,
          cellDataType: 'localeDatetime'
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'remove-transaction',
            title: 'Smazat transakci',
            action: row => this.removeTransactionModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            ),
            color: 'danger'
          }
        ], 200)
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<AdminListFilter>)
    : rxjs.Observable<RawHttpResponse<PaginatedResponse<TransactionItem>>> {
    const requestData: WithSortAndPagination<AdminListRequest> = {
      createdFrom: request.created?.from ?? null,
      createdTo: request.created?.to ?? null,
      guildId: request.guildId,
      messageId: request.messageId,
      onlyMessages: request.onlyMessages,
      onlyReactions: request.onlyReactions,
      pagination: request.pagination,
      showMerged: request.showMerged,
      sort: request.sort,
      userId: request.userId
    };

    return this.#pointsClient.getTransactionList(requestData);
  }

  override createDefaultSort(): SortParameters {
    return { descending: true };
  }

  onRowsUpdated(event: RowDataUpdatedEvent): void {
    event.api.setColumnsVisible(['mergedCount', 'mergedFrom', 'mergedTo'], this.filter.showMerged);
    event.api.setColumnsVisible(['actions'], !this.filter.showMerged);
    event.api.sizeColumnsToFit();
  }

  confirmRemoveTransaction() {
    const modal = this.removeTransactionModal();
    if (!this.rowInModal || !modal) {
      return;
    }

    this.#pointsClient
      .deleteTransaction(this.rowInModal.guildId, this.rowInModal.messageId, this.rowInModal.reactionId)
      .subscribe(() => {
        modal.close();
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
