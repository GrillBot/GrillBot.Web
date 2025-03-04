import { Component, inject, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonDef, ButtonsCellRendererComponent, GuildLookupPipe, ListBaseComponent,
  ModalComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, usePipeTransform,
  UserLookupPipe
} from "../../../../components";
import { MeasuresListParams } from "../../../../core/models/user-measures/measures-list-params";
import { MeasuresItem } from "../../../../core/models/user-measures/measures-item";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { UserMeasuresClient } from "../../../../core/clients/user-measures.client";
import { CutStringPipe, LocaleDatePipe } from "../../../../core/pipes";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { ButtonDirective, TableDirective } from "@coreui/angular";

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
    ButtonDirective
  ]
})
export class MeasuresListListComponent extends ListBaseComponent<MeasuresListParams, MeasuresItem> {
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
        {
          field: 'moderatorId',
          headerName: 'Moderátor',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
          }
        },
        {
          field: 'userId',
          headerName: 'Uživatel',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
          }
        },
        {
          field: 'guildId',
          headerName: 'Server',
          cellRenderer: AsyncLookupCellRendererComponent,
          cellRendererParams: {
            sourceGenerator: (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
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
                action: row => this.openFullReasonModal()?.open(
                  () => this.reasonInModal = row.reason,
                  () => this.reasonInModal = undefined
                ),
                isVisible: row => row.reason.length >= MAX_REASON_CELL_LENGTH
              },
              {
                id: 'remove-measure',
                title: 'Smazat opatření',
                size: 'sm',
                variant: 'ghost',
                color: 'danger',
                action: row => this.removeMeasureModal()?.open(
                  () => this.rowInModal = row,
                  () => this.rowInModal = undefined
                )
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
