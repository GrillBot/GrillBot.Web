import { Component, inject, LOCALE_ID, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, CheckboxCellRenderer,
  ListBaseComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, usePipeTransform
} from "../../../../components";
import { RemindMessageItem } from "../../../../core/models/reminder/remind-message-item";
import { ReminderListRequest } from "../../../../core/models/reminder/reminder-list-request";
import { GridOptions } from "ag-grid-community";
import * as rxjs from "rxjs";
import {
  WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters
} from "../../../../core/models/common";
import { ReminderClient } from "../../../../core/clients/reminder.client";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { LocaleDatePipe, SpacedNumberPipe } from "../../../../core/pipes";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../../../core/models/users/user";
import { mapUserToLookupRow } from "../../../../core/mappers/lookup.mapper";
import {
  AlertComponent, ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent,
  ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective
} from "@coreui/angular";
import { CancelReminderRequest } from "../../../../core/models/reminder/cancel-reminder-request";

@Component({
  selector: 'app-reminder-list-list',
  templateUrl: './reminder-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ButtonCloseDirective,
    AlertComponent,
    TableDirective,
    LocaleDatePipe,
    ModalFooterComponent,
    ButtonDirective
  ]
})
export class ReminderListListComponent extends ListBaseComponent<ReminderListRequest, RemindMessageItem> {
  readonly #client = inject(ReminderClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

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
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe)
        },
        {
          field: 'fromUserId',
          headerName: 'Od uživatele',
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
          field: 'toUserId',
          headerName: 'Komu',
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
          field: 'notifyAtUtc',
          headerName: 'Datum a čas oznámení',
          maxWidth: 230,
          valueFormatter: params => LocaleDatePipe.transformValue(params.value, 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID),
          sortable: true,
          context: {
            sortKey: 'NotifyAt'
          }
        },
        {
          field: 'postponeCount',
          headerName: 'Počet odložení',
          maxWidth: 170,
          valueFormatter: params => usePipeTransform(params, SpacedNumberPipe),
          sortable: true,
          context: {
            sortKey: 'PostponeCount'
          }
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
                action: row => this.openMessage(row)
              },
              {
                id: 'cancel-and-notify',
                title: 'Oznámit a stornovat',
                color: 'dark',
                action: row => this.openCancelModal(row, true),
                isVisible: row => !this.isNotified(row) && String(row.notificationMessageId ?? '').length === 0
              },
              {
                id: 'cancel',
                title: 'Stornovat',
                color: 'dark',
                action: row => this.openCancelModal(row, false),
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

  private openMessage(row: RemindMessageItem): void {
    this.openModal(
      this.messageModal(),
      () => this.modalRow = row,
      () => this.modalRow = undefined
    );
  }

  private openCancelModal(row: RemindMessageItem, notify: boolean) {
    this.openModal(
      this.cancelModal(),
      () => this.cancelModalRow = { notify, row },
      () => this.cancelModalRow = undefined
    )
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
      modal.visible = false;
      this.reload();
    });
  }
}
