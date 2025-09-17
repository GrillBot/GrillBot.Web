import { Component, inject, signal, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, GuildLookupPipe, ListBaseComponent, ModalComponent,
  ModalQuestionButtonsComponent, PaginatedGridComponent, UserLookupPipe
} from "../../../../components";
import { UnverifyLogItem } from "../../../../core/models/unverify/unverify-log-item";
import { UnverifyLogFilter, UnverifyLogListRequest } from "../../../../core/models/unverify/unverify-log-list-request";
import { GridOptions } from "ag-grid-community";
import { catchError, EMPTY, filter, Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { LookupClient, UnverifyClient } from "../../../../core/clients";
import { UnverifyOperationLocalization, UnverifyOperationType } from "../../../../core/enums/unverify-operation-type";
import { PreviewCellRendererComponent } from "./preview-cell-renderer/preview-cell-renderer.component";
import { AsyncPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { mapHttpErrors } from "../../../../core/mappers";

@Component({
  templateUrl: './log-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ModalQuestionButtonsComponent,
    UserLookupPipe,
    AsyncPipe
  ]
})
export class LogListComponent extends ListBaseComponent<UnverifyLogFilter, UnverifyLogItem> {
  readonly #client = inject(UnverifyClient);
  readonly #lookupClient = inject(LookupClient);

  recoveryModal = viewChild<ModalComponent>('recoveryModal');
  rowInModal?: UnverifyLogItem;
  recoveryResult = signal<string[] | null>(null);

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'id',
          headerName: 'ID',
          tooltipField: 'id',
          resizable: true
        },
        {
          field: 'logNumber',
          headerName: 'Číslo operace',
          width: 130
        },
        {
          field: 'parentItemId',
          headerName: 'ID rodičovského záznamu',
          tooltipField: 'parentItemId',
          resizable: true
        },
        {
          field: 'type',
          headerName: 'Typ',
          valueFormatter: params => (UnverifyOperationLocalization as any)[UnverifyOperationType[params.value]],
          sortable: true,
          context: {
            sortingKey: 'Operation'
          },
          width: 160
        },
        AsyncLookupCellRendererComponent.createColDef(
          'guildId',
          'Server',
          (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'fromUserId',
          'Vykonavatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'toUserId',
          'Cílový uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        {
          field: 'createdAtUtc',
          headerName: 'Vytvořeno',
          cellDataType: 'localeDatetime',
          initialSort: 'desc',
          context: {
            sortingKey: 'Created'
          },
          sortable: true,
          width: 150
        },
        {
          field: 'preview',
          headerName: 'Náhled',
          resizable: true,
          cellRenderer: PreviewCellRendererComponent
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'detail',
            title: 'Detail',
            redirectTo: (row: UnverifyLogItem) => `/web/unverify/log/${row.id}`,
            color: 'primary'
          },
          {
            id: 'recovery',
            title: 'Obnovit',
            action: (row: UnverifyLogItem) => this.recoveryModal()?.open(
              () => this.rowInModal = row,
              () => {
                this.rowInModal = undefined;
                this.recoveryResult.set(null);
              }
            ),
            color: 'success',
            isVisible: row => [UnverifyOperationType.Unverify, UnverifyOperationType.SelfUnverify].includes(row.type)
          }
        ])
      ]
    };
  }

  override createRequest(request: WithSortAndPagination<UnverifyLogFilter>): Observable<RawHttpResponse<PaginatedResponse<UnverifyLogItem>>> {
    const searchRequest: WithSortAndPagination<UnverifyLogListRequest> = {
      createdFrom: request.created?.from ?? null,
      createdTo: request.created?.to ?? null,
      fromUserId: request.fromUserId,
      guildId: request.guildId,
      operation: request.operation,
      pagination: request.pagination,
      parentLogItemId: request.parentLogItemId,
      sort: request.sort,
      toUserId: request.toUserId
    };

    return this.#client.getUnverifyLogs(searchRequest);
  }

  override createDefaultSort(): SortParameters {
    return {
      orderBy: 'Created',
      descending: true
    };
  }

  confirmRecovery(): void {
    const modal = this.recoveryModal();

    if (!modal || !this.rowInModal) {
      return;
    }

    this.#client.recoverAccess(this.rowInModal.id)
      .pipe(
        filter(res => res.type === 'finish'),
        catchError((err: HttpErrorResponse) => {
          this.recoveryResult.set(mapHttpErrors(err));
          this.rowInModal = undefined;

          return EMPTY;
        }))
      .subscribe(() => this.recoveryResult.set(['Obnovení přístupu bylo úspěšně dokončeno.']));
  }
}
