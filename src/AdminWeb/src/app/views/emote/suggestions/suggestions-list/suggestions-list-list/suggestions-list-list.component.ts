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
import { FormControlDirective } from '@coreui/angular';
import { AsReadonlyFormControlPipe, LocaleDatePipe, SpacedNumberPipe } from '../../../../../core/pipes';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    SpacedNumberPipe
  ]
})
export class SuggestionsListListComponent extends ListBaseComponent<EmoteSuggestionsListFilter, EmoteSuggestionItem> {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);

  rowInModal?: EmoteSuggestionItem;
  detailsModal = viewChild<ModalComponent>('detailModal');

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
          sort: 'asc',
          context: {
            sortingKey: 'SuggestedAt'
          }
        },
        CheckboxCellRenderer.createColDef('approvedForVote', 'Schváleno', { maxWidth: 120 }),
        CheckboxCellRenderer.createColDef('voteStartAt', 'Hlasování', { maxWidth: 120 }),
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
            action: row => this.openSuggestionVotesPage(row),
            isVisible: (row: EmoteSuggestionItem) => row.approvedForVote && !!row.voteStartAt
          },
          {
            id: 'cancel-vote',
            title: 'Zrušit hlasování',
            color: 'danger',
            action: row => this.cancelVote(row),
            isVisible: (row: EmoteSuggestionItem) => row.approvedForVote && !!row.voteStartAt
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
      descending: false,
      orderBy: 'SuggestedAt'
    };
  }

  openSuggestionVotesPage(row: EmoteSuggestionItem): void {
  }

  cancelVote(row: EmoteSuggestionItem): void {
  }
}
