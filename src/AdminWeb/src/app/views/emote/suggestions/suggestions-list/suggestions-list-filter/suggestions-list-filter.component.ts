import { Component } from "@angular/core";
import {
  DatetimeRangeComponent,
  FilterBaseComponent, FilterCardComponent, GuildLookupComponent, RadioGroupComponent, RadioItem, TextInputComponent,
  UserLookupComponent
} from "../../../../../components";
import { IForm } from "../../../../../core/models/common";
import { EmoteSuggestionsListFilter, EmoteSuggestionsListRequest } from "../../../../../core/models/emote";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-suggestions-list-filter',
  templateUrl: './suggestions-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FilterCardComponent,
    TextInputComponent,
    GuildLookupComponent,
    UserLookupComponent,
    RowComponent,
    ColComponent,
    DatetimeRangeComponent,
    RadioGroupComponent,
    FormLabelDirective
]
})
export class SuggestionsListFilterComponent extends FilterBaseComponent<EmoteSuggestionsListFilter> {
  approveItems: RadioItem[] = [
    { label: 'Schváleno', value: true },
    { label: 'Zamítnuto', value: false },
    { label: 'Nerozhoduje', value: null },
  ];

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
