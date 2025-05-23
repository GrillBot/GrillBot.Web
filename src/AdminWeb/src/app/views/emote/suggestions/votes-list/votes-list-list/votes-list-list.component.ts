import { Component, inject, input } from "@angular/core";
import { AsyncLookupCellRendererComponent, CheckboxCellRenderer, ListBaseComponent, PaginatedGridComponent, UserLookupPipe } from "../../../../../components";
import { EmoteSuggestionVoteItem, EmoteSuggestionVoteListRequest } from "../../../../../core/models/emote";
import { EmoteClient, LookupClient } from "../../../../../core/clients";
import { GridOptions } from "ag-grid-community";
import { Observable } from "rxjs";
import { WithSortAndPagination, RawHttpResponse, PaginatedResponse, SortParameters } from "../../../../../core/models/common";

@Component({
  selector: 'app-votes-list-list',
  templateUrl: './votes-list-list.component.html',
  standalone: true,
  imports: [
    PaginatedGridComponent
  ]
})
export class VotesListListComponent extends ListBaseComponent<EmoteSuggestionVoteListRequest, EmoteSuggestionVoteItem> {
  readonly #client = inject(EmoteClient);
  readonly #lookupClient = inject(LookupClient);

  suggestionId = input.required<string>();

  override createGridOptions(): GridOptions {
    return {
      columnDefs: [
        AsyncLookupCellRendererComponent.createColDef(
          'userId',
          'Uživatel',
          (userId: string) => UserLookupPipe.processTransform(userId, this.#lookupClient)
        ),
        CheckboxCellRenderer.createColDef('isApproved', 'Schváleno', {
          maxWidth: 120
        }),
        {
          field: 'votedAtUtc',
          headerName: 'Hlasováno',
          cellDataType: 'localeDatetime',
          maxWidth: 200,
          sortable: true,
          sort: 'desc',
          context: {
            sortingKey: 'VotedAt'
          }
        }
      ],
      getRowClass: params => params.data.isApproved ? 'bg-success-subtle' : 'bg-danger-subtle'
    }
  }

  override createRequest(request: WithSortAndPagination<EmoteSuggestionVoteListRequest>)
    : Observable<RawHttpResponse<PaginatedResponse<EmoteSuggestionVoteItem>>> {
    return this.#client.getEmoteSuggestionVotes(this.suggestionId(), request);
  }

  override createDefaultSort(): SortParameters {
    return { descending: true };
  }
}
