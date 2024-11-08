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
  AlertComponent, ButtonCloseDirective, ModalBodyComponent, ModalComponent, ModalHeaderComponent,
  ModalTitleDirective
} from "@coreui/angular";

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
    AlertComponent
  ]
})
export class ReminderListListComponent extends ListBaseComponent<ReminderListRequest, RemindMessageItem> {
  readonly #client = inject(ReminderClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  messageModal = viewChild<ModalComponent>('messageModal');
  messageModalRow?: RemindMessageItem;

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
                action: row => this.openCancellationModal(row, true),
                isVisible: row => !this.isNotified(row)
              },
              {
                id: 'cancel',
                title: 'Stornovat',
                color: 'dark',
                action: row => this.openCancellationModal(row, false),
                isVisible: row => !this.isNotified(row)
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
    return this.#client.getReminderList(request);
  }

  override createDefaultSort(): SortParameters {
    return {
      descending: true,
      orderBy: 'id'
    };
  }

  private isNotified(row: RemindMessageItem): boolean {
    return row.isSendInProgress || String(row.notificationMessageId ?? '').length > 0;
  }

  private openMessage(row: RemindMessageItem): void {
    this.openModal(
      this.messageModal(),
      () => this.messageModalRow = row,
      () => this.messageModalRow = undefined
    );
  }

  private openCancellationModal(row: RemindMessageItem, notify: boolean) {
    alert(notify); // TODO Implement modal and confirmation.
  }
}
