import { Component } from "@angular/core";
import {
  DatetimeRangeComponent,
  FilterBaseComponent, FilterCardComponent, GuildLookupComponent, TextInputComponent,
  UserLookupComponent
} from "../../../../../components";
import { IForm } from "../../../../../core/models/common";
import { EmoteSuggestionsListFilter, EmoteSuggestionsListRequest } from "../../../../../core/models/emote";
import { ReactiveFormsModule } from "@angular/forms";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";
import { ColComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-suggestions-list-filter',
  templateUrl: './suggestions-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TriStateCheckboxModule,
    FilterCardComponent,
    TextInputComponent,
    GuildLookupComponent,
    UserLookupComponent,
    TriStateCheckboxModule,
    RowComponent,
    ColComponent,
    DatetimeRangeComponent
  ]
})
export class SuggestionsListFilterComponent extends FilterBaseComponent<EmoteSuggestionsListFilter> {
  override configure(): void {
    this.filterId = 'emote/suggestions-list';
  }

  override createForm(): IForm<EmoteSuggestionsListFilter> {
    return {
      guildId: this.createControl(),
      fromUserId: this.createControl(),
      suggested: this.createControl(),
      nameContains: this.createControl(),
      approvalState: this.createControl(),
    };
  }
}
