import { Component, inject, LOCALE_ID, viewChild } from "@angular/core";
import { AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, ListBaseComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, usePipeTransform } from "../../../../components";
import { MeasuresListParams } from "../../../../core/models/user-measures/measures-list-params";
import { MeasuresItem } from "../../../../core/models/user-measures/measures-item";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { UserMeasuresClient } from "../../../../core/clients/user-measures.client";
import { CutStringPipe, LocaleDatePipe } from "../../../../core/pipes";
import { LookupClient } from "../../../../core/clients/lookup.client";
import * as rxjs from 'rxjs';
import { mapGuildToLookupRow, mapUserToLookupRow } from "../../../../core/mappers/lookup.mapper";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../../../core/models/users/user";
import { Guild } from "../../../../core/models/guilds/guild";
import { ButtonCloseDirective, ButtonDirective, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, TableDirective } from "@coreui/angular";

const MAX_REASON_CELL_LENGTH = 30;

@Component({
  selector: 'app-measures-list-list',
  templateUrl: './measures-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ButtonCloseDirective,
    TableDirective,
    LocaleDatePipe,
    ModalFooterComponent,
    ButtonDirective
  ]
})
export class MeasuresListListComponent extends ListBaseComponent<MeasuresListParams, MeasuresItem> {
  readonly #client = inject(UserMeasuresClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #LOCALE_ID = inject(LOCALE_ID);

  openFullReasonModal = viewChild<ModalComponent>('openFullReasonModal');
  reasonInModal?: string;

  removeMeasureModal = viewChild<ModalComponent>('removeMeasureModal');
  rowInModal?: MeasuresItem;

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'type',
          headerName: 'Typ',
          maxWidth: 100,
          valueFormatter: params => this.getMeasureType(params.value)
        },
        {
          field: 'createdAtUtc',
          headerName: 'Vytvořeno',
          maxWidth: 200,
          valueFormatter: params => LocaleDatePipe.transformValue(params.value, 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID)
        },
        {
          field: 'validTo',
          headerName: 'Platí do',
          maxWidth: 200,
          valueFormatter: params => LocaleDatePipe.transformValue(params.value, 'dd. MM. yyyy HH:mm:ss', this.#LOCALE_ID)
        },
        {
          field: 'moderatorId',
          headerName: 'Moderátor',
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
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) =>
              this.#lookupClient.resolveGuild(guildId).pipe(
                rxjs.catchError((err: HttpErrorResponse) => err.status == 404 ? rxjs.of(null as Guild | null) : rxjs.throwError(() => err)),
                rxjs.map(guild => mapGuildToLookupRow(guild, guildId)),
              )
          }
        },
        {
          field: 'reason',
          headerName: 'Důvod',
          tooltipField: 'reason',
          valueFormatter: params => usePipeTransform(params, CutStringPipe, MAX_REASON_CELL_LENGTH, false),
          maxWidth: 300
        },
        {
          headerName: 'Akce',
          colId: 'actions',
          cellRenderer: ButtonsCellRendererComponent,
          cellRendererParams: {
            buttons: [
              {
                id: 'show-full-reason',
                title: 'Zobrazit celý důvod',
                size: 'sm',
                variant: 'ghost',
                color: 'primary',
                action: row => this.openFullReason(row),
                isVisible: row => row.reason.length >= MAX_REASON_CELL_LENGTH
              },
              {
                id: 'remove-measure',
                title: 'Smazat opatření',
                size: 'sm',
                variant: 'ghost',
                color: 'danger',
                action: row => this.removeMeasure(row)
              }
            ] as ButtonDef[]
          }
        }
      ],
      getRowClass: params => params.data.type === 'Warning' ? ['bg-warning-subtle'] : undefined,
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<MeasuresListParams>)
    : Observable<RawHttpResponse<PaginatedResponse<MeasuresItem>>> {
    return this.#client.getMeasuresList(request);
  }

  override createDefaultSort(): SortParameters {
    return {};
  }

  private openFullReason(row: MeasuresItem): void {
    this.openModal(
      this.openFullReasonModal(),
      () => this.reasonInModal = row.reason,
      () => this.reasonInModal = undefined
    );
  }

  private removeMeasure(row: MeasuresItem): void {
    this.openModal(
      this.removeMeasureModal(),
      () => this.rowInModal = row,
      () => this.rowInModal = undefined
    );
  }

  confirmRemoveMeasure(): void {
    const modal = this.removeMeasureModal();
    if (!modal || !this.rowInModal) {
      return;
    }

    this.#client.deleteMeasure(this.rowInModal.measureId).subscribe(() => {
      modal.visible = false;
      this.reload();
    });
  }

  getMeasureType(type: string): string {
    return type.replace('Warning', 'Varování');
  }
}
