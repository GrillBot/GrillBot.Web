import { ButtonsCellRendererComponent } from './../../../../../components/ag-grid/renderers/action-buttons-cell-renderer/buttons-cell-renderer.component';
import { Component, inject, viewChild } from "@angular/core";
import {
  AsyncLookupCellRendererComponent, CheckboxCellRenderer, CheckboxComponent, GuildLookupPipe, InfoRowComponent, ListBaseComponent,
  ModalComponent, PaginatedGridComponent, STRIPED_ROW_STYLE, UserLookupPipe
} from "../../../../../components";
import { EmoteSuggestionItem, EmoteSuggestionsListFilter, EmoteSuggestionsListRequest } from "../../../../../core/models/emote";
import { EmoteClient, LookupClient } from "../../../../../core/clients";
import { GridOptions } from "ag-grid-community";
import * as rxjs from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../../core/models/common";
import { ButtonDirective, ColComponent, FormControlDirective, RowComponent } from '@coreui/angular';
import { AsReadonlyFormControlPipe, LocaleDatePipe, SpacedNumberPipe } from '../../../../../core/pipes';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-list-list',
  templateUrl: './suggestions-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent,
    ModalComponent,
    LocaleDatePipe,
    UserLookupPipe,
    GuildLookupPipe,
    InfoRowComponent,
    AsyncPipe,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    CheckboxComponent,
    FormControlDirective,
    SpacedNumberPipe,
    RowComponent,
    ColComponent,
    ButtonDirective
  ]
})
export class SuggestionsListListComponent extends ListBaseComponent<EmoteSuggestionsListFilter, EmoteSuggestionItem> {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);
  readonly #router = inject(Router);

  rowInModal?: EmoteSuggestionItem;
  detailsModal = viewChild<ModalComponent>('detailModal');
  cancelVoteModal = viewChild<ModalComponent>('cancelVoteModal');

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        AsyncLookupCellRendererComponent.createColDef(
          'guildId',
          'Server',
          (guildId: string) => GuildLookupPipe.processTransform(guildId, this.#lookupClient)
        ),
        AsyncLookupCellRendererComponent.createColDef(
          'fromUserId',
          'Od uživatele',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        {
          field: 'name',
          headerName: 'Název'
        },
        {
          field: 'suggestedAtUtc',
          headerName: 'Navrhnuto',
          cellDataType: 'localeDatetime',
          maxWidth: 200,
          sortable: true,
          sort: 'desc',
          context: {
            sortingKey: 'SuggestedAt'
          }
        },
        CheckboxCellRenderer.createColDef('approvedForVote', 'Schváleno', { maxWidth: 120 }),
        {
          colId: 'voteInfo',
          headerName: 'Hlasování',
          maxWidth: 130,
          valueGetter: params => {
            const row = params.data as EmoteSuggestionItem;

            if (!row.voteEndAt) { return 'Nespuštěno'; }
            if (row.voteKilledAt) { return 'Zrušeno'; }

            return DateTime.fromISO(row.voteEndAt).diffNow().toMillis() > 0 ? 'Probíhá' : 'Skončilo';
          },
          cellClass: params => {
            switch (params.value) {
              case 'Probíhá':
                return 'bg-warning-subtle';
              case 'Skončilo':
                return 'bg-success-subtle';
              case 'Zrušeno':
                return 'bg-danger-subtle';
              default:
                return undefined;
            }
          }
        },
        ButtonsCellRendererComponent.createColumnDef([
          {
            id: 'show-detail',
            title: 'Podrobnosti',
            color: 'primary',
            action: row => this.detailsModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            )
          },
          {
            id: 'show-votes',
            title: 'Hlasování',
            color: 'primary',
            action: row => this.#router.navigate(['web/emote/suggestions', row.id, 'votes']),
            isVisible: (row: EmoteSuggestionItem) =>
              row.approvedForVote &&
              !!row.voteEndAt &&
              ((row.upVotes ?? 0) + (row.downVotes ?? 0)) > 0
          },
          {
            id: 'cancel-vote',
            title: 'Zrušit hlasování',
            color: 'danger',
            action: row => this.cancelVoteModal()?.open(
              () => this.rowInModal = row,
              () => this.rowInModal = undefined
            ),
            isVisible: (row: EmoteSuggestionItem) => {
              // Non-started or killed votes.
              if (!row.voteStartAt || row.voteKilledAt || !row.voteEndAt) {
                return false;
              }

              // Unfinished votes.
              return DateTime.fromISO(row.voteEndAt).diffNow().toMillis() > 0;
            }
          }
        ])
      ],
      getRowStyle: STRIPED_ROW_STYLE
    };
  }

  override createRequest(request: WithSortAndPagination<EmoteSuggestionsListFilter>)
    : rxjs.Observable<RawHttpResponse<PaginatedResponse<EmoteSuggestionItem>>> {
    const requestData: WithSortAndPagination<EmoteSuggestionsListRequest> = {
      pagination: request.pagination,
      sort: request.sort,
      approvalState: request.approvalState,
      fromUserId: request.fromUserId,
      guildId: request.guildId,
      nameContains: request.nameContains,
      suggestedFrom: request.suggested?.from ?? undefined,
      suggestedTo: request.suggested?.to ?? undefined
    };

    return this.#client.getEmoteSuggestionsList(requestData);
  }

  override createDefaultSort(): SortParameters {
    return {
      descending: true,
      orderBy: 'SuggestedAt'
    };
  }

  cancelVote(): void {
    const modal = this.cancelVoteModal();
    if (!modal || !this.rowInModal) {
      return;
    }

    this.#client.emoteSuggestionsCancelVote(this.rowInModal.id)
      .pipe(rxjs.delay(1000))
      .subscribe(() => {
        this.reload();
        modal.close();
      });
  }
}
