import { Component, inject, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, GuildLookupPipe, ListBaseComponent,
  ModalComponent, ModalQuestionButtonsComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, usePipeTransform, UserLookupPipe
} from "../../../../components";
import { MeasuresListFilter, MeasuresListParams } from "../../../../core/models/user-measures/measures-list-params";
import { MeasuresItem } from "../../../../core/models/user-measures/measures-item";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { UserMeasuresClient } from "../../../../core/clients/user-measures.client";
import { CutStringPipe, LocaleDatePipe } from "../../../../core/pipes";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { TableDirective } from "@coreui/angular";
import { AsyncPipe } from "@angular/common";

const MAX_REASON_CELL_LENGTH = 30;

@Component({
  selector: 'app-measures-list-list',
  templateUrl: './measures-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    TableDirective,
    LocaleDatePipe,
    UserLookupPipe,
    GuildLookupPipe,
    AsyncPipe,
    ModalQuestionButtonsComponent
  ]
})
export class MeasuresListListComponent extends ListBaseComponent<MeasuresListFilter, MeasuresItem> {
  readonly #client = inject(UserMeasuresClient);
  readonly #lookupClient = inject(LookupClient);

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
          cellDataType: 'localeDatetime'
        },
        {
          field: 'validTo',
          headerName: 'Platí do',
          maxWidth: 200,
          cellDataType: 'localeDatetime'
        },
        AsyncLookupCellRendererComponent.createColDef(
          'moderatorId',
          'Moderátor',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'guildId',
          'Server',
          (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
        ),
        {
          field: 'reason',
          headerName: 'Důvod',
          tooltipField: 'reason',
          valueFormatter: params => usePipeTransform(params, CutStringPipe, MAX_REASON_CELL_LENGTH, false),
          maxWidth: 300
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'show-full-reason',
            title: 'Zobrazit celý důvod',
            color: 'primary',
            action: row => this.openFullReasonModal()?.open(
              () => this.reasonInModal = row.reason,
              () => this.reasonInModal = undefined
            ),
            isVisible: row => row.reason.length >= MAX_REASON_CELL_LENGTH
          },
          {
            id: 'remove-measure',
            title: 'Smazat opatření',
            color: 'danger',
            action: row => this.removeMeasureModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            )
          }
        ])
      ],
      getRowClass: params => params.data.type === 'Warning' ? ['bg-warning-subtle'] : undefined,
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<MeasuresListFilter>)
    : Observable<RawHttpResponse<PaginatedResponse<MeasuresItem>>> {
    const requestData: WithSortAndPagination<MeasuresListParams> = {
      createdFrom: request.created?.from ?? null,
      createdTo: request.created?.to ?? null,
      guildId: request.guildId,
      moderatorId: request.moderatorId,
      pagination: request.pagination,
      sort: request.sort,
      type: request.type,
      userId: request.userId
    };

    return this.#client.getMeasuresList(requestData);
  }

  override createDefaultSort(): SortParameters {
    return {};
  }

  confirmRemoveMeasure(): void {
    const modal = this.removeMeasureModal();
    if (!modal || !this.rowInModal) {
      return;
    }

    this.#client.deleteMeasure(this.rowInModal.measureId).subscribe(() => {
      modal.close();
      this.reload();
    });
  }

  getMeasureType(type: string): string {
    return type.replace('Warning', 'Varování');
  }
}
