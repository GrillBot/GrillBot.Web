import { Component, input } from "@angular/core";
import { FilterBaseComponent, FilterCardComponent, UserLookupComponent } from "../../../../../components";
import { EmoteSuggestionVoteListRequest } from "../../../../../core/models/emote";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";
import { IForm } from "../../../../../core/models/common";

@Component({
  selector: 'app-votes-list-filter',
  templateUrl: './votes-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FilterCardComponent,
    UserLookupComponent,
    RowComponent,
    ColComponent
  ]
})
export class VotesListFilterComponent extends FilterBaseComponent<EmoteSuggestionVoteListRequest> {
  suggestionId = input.required<string>();

  override configure(): void {
    this.filterId = `votes/votes-list/${this.suggestionId}`;
  }

  override createForm(): IForm<EmoteSuggestionVoteListRequest> {
    return {
      userId: this.createControl()
    }
  }
}
