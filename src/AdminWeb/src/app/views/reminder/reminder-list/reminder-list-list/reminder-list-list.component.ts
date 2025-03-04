import { Component, inject, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, CheckboxCellRenderer,
  ListBaseComponent, ModalComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, UserLookupPipe
} from "../../../../components";
import { RemindMessageItem } from "../../../../core/models/reminder/remind-message-item";
import { ReminderListRequest } from "../../../../core/models/reminder/reminder-list-request";
import { GridOptions } from "ag-grid-community";
import * as rxjs from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { ReminderClient } from "../../../../core/clients/reminder.client";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { LocaleDatePipe } from "../../../../core/pipes";
import { AlertComponent, ButtonDirective, TableDirective } from "@coreui/angular";
import { CancelReminderRequest } from "../../../../core/models/reminder/cancel-reminder-request";

@Component({
  selector: 'app-reminder-list-list',
  templateUrl: './reminder-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    AlertComponent,
    TableDirective,
    LocaleDatePipe,
    ButtonDirective
  ]
})
export class ReminderListListComponent extends ListBaseComponent<ReminderListRequest, RemindMessageItem> {
  readonly #client = inject(ReminderClient);
  readonly #lookupClient = inject(LookupClient);

  messageModal = viewChild<ModalComponent>('messageModal');
  modalRow?: RemindMessageItem;

  cancelModal = viewChild<ModalComponent>('cancelModal');
  cancelModalRow?: { notify: boolean, row: RemindMessageItem };

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'id',
          headerName: 'Id',
          maxWidth: 100,
          cellDataType: 'spacedNumber'
        },
        {
          field: 'fromUserId',
          headerName: 'Od uživatele',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
          }
        },
        {
          field: 'toUserId',
          headerName: 'Komu',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
          }
        },
        {
          field: 'notifyAtUtc',
          headerName: 'Datum a čas oznámení',
          maxWidth: 230,
          sortable: true,
          context: {
            sortKey: 'NotifyAt'
          },
          cellDataType: 'localeDatetime'
        },
        {
          field: 'postponeCount',
          headerName: 'Počet odložení',
          maxWidth: 170,
          sortable: true,
          context: {
            sortKey: 'PostponeCount'
          },
          cellDataType: 'spacedNumber'
        },
        {
          field: 'notificationMessageId',
          headerName: 'Oznámeno',
          valueGetter: params => this.isNotified(params.data),
          cellRenderer: CheckboxCellRenderer,
          maxWidth: 110
        },
        {
          field: 'language',
          headerName: 'Jazyk',
          maxWidth: 130
        },
        {
          field: 'commandMessageId',
          headerName: 'ID zprávy',
          maxWidth: 230
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'show-message',
                title: 'Zobrazit zprávu',
                color: 'primary',
                action: row => this.messageModal()?.open(
                  () => this.modalRow = row,
                  () => this.modalRow = undefined
                )
              },
              {
                id: 'cancel-and-notify',
                title: 'Oznámit a stornovat',
                color: 'dark',
                action: row => this.cancelModal()?.open(
                  () => this.cancelModalRow = { notify: true, row },
                  () => this.cancelModalRow = undefined
                ),
                isVisible: row => !this.isNotified(row) && String(row.notificationMessageId ?? '').length === 0
              },
              {
                id: 'cancel',
                title: 'Stornovat',
                color: 'dark',
                action: row => this.cancelModal()?.open(
                  () => this.cancelModalRow = { notify: false, row },
                  () => this.cancelModalRow = undefined
                ),
                isVisible: row => !this.isNotified(row) && String(row.notificationMessageId ?? '').length === 0
              }
            ] as ButtonDef[]
          }
        }
      ],
      getRowClass: params => params.data.isSendInProgress ? ['bg-success-subtle'] : undefined,
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<ReminderListRequest>)
    : rxjs.Observable<RawHttpResponse<PaginatedResponse<RemindMessageItem>>> {
    if (request.notifyAtFromUtc) {
      request.notifyAtFromUtc = `${request.notifyAtFromUtc}Z`;
    }

    if (request.notifyAtToUtc) {
      request.notifyAtToUtc = `${request.notifyAtToUtc}Z`;
    }

    return this.#client.getReminderList(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      descending: true,
      orderBy: 'id'
    };
  }

  private isNotified(row: RemindMessageItem): boolean {
    return row.isSendInProgress || (String(row.notificationMessageId ?? '').length > 0 && row.notificationMessageId !== "0");
  }

  confirmCancel(): void {
    const modal = this.cancelModal();
    if (!modal || !this.cancelModalRow) {
      return;
    }

    const request: CancelReminderRequest = {
      notifyUser: this.cancelModalRow.notify,
      remindId: this.cancelModalRow.row.id
    };

    this.#client.cancelRemind(request).subscribe(() => {
      modal.close();
      this.reload();
    });
  }
}
