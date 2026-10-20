import { Component, inject, viewChild, ChangeDetectionStrategy } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, ButtonsCellRendererComponent, GuildLookupPipe, ListBaseComponent,
  ModalComponent, ModalQuestionButtonsComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, usePipeTransform, UserLookupPipe
} from "../../../../components";
import { InfractionListFilter, InfractionListParams } from "../../../../core/models/infractions/infraction-list-params";
import { InfractionItem } from "../../../../core/models/infractions/infraction-item";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../core/models/common";
import { InfractionsClient } from "../../../../core/clients/infractions.client";
import { CutStringPipe, LocaleDatePipe } from "../../../../core/pipes";
import { LookupClient } from "../../../../core/clients/lookup.client";
import { TableDirective } from "@coreui/angular";
import { AsyncPipe } from "@angular/common";

const MAX_REASON_CELL_LENGTH = 30;

@Component({
  selector: 'app-infraction-list-list',
  templateUrl: './infraction-list-list.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
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
export class InfractionListListComponent extends ListBaseComponent<InfractionListFilter, InfractionItem> {
  readonly #client = inject(InfractionsClient);
  readonly #lookupClient = inject(LookupClient);

  openFullReasonModal = viewChild<ModalComponent>('openFullReasonModal');
  reasonInModal?: string;

  removeInfractionModal = viewChild<ModalComponent>('removeInfractionModal');
  rowInModal?: InfractionItem;

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        {
          field: 'type',
          headerName: 'Typ',
          maxWidth: 100,
          valueFormatter: params => this.getInfractionType(params.value)
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
            id: 'remove-infraction',
            title: 'Smazat opatření',
            color: 'danger',
            action: row => this.removeInfractionModal()?.open(
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

  override createRequest(request: WithSortAndPagination<InfractionListFilter>)
    : Observable<RawHttpResponse<PaginatedResponse<InfractionItem>>> {
    const requestData: WithSortAndPagination<InfractionListParams> = {
      createdFrom: request.created?.from ?? null,
      createdTo: request.created?.to ?? null,
      guildId: request.guildId,
      moderatorId: request.moderatorId,
      pagination: request.pagination,
      sort: request.sort,
      type: request.type,
      userId: request.userId
    };

    return this.#client.getInfractionList(requestData);
  }

  override createDefaultSort(): SortParameters {
    return {};
  }

  confirmRemoveInfraction(): void {
    const modal = this.removeInfractionModal();
    if (!modal || !this.rowInModal) {
      return;
    }

    this.#client.deleteInfraction(this.rowInModal.infractionId).subscribe(() => {
      modal.close();
      this.reload();
    });
  }

  getInfractionType(type: string): string {
    return type.replace('Warning', 'Varování');
  }
}
