import { Component } from "@angular/core";
import {
  FilterBaseComponent, FilterCardComponent, TextInputComponent
} from "../../../../../components";
import { IForm } from "../../../../../core/models/common";
import { EmoteSuggestionsListRequest } from "../../../../../core/models/emote";
import { ReactiveFormsModule } from "@angular/forms";
import { TriStateCheckboxModule } from "primeng/tristatecheckbox";

@Component({
  selector: 'app-suggestions-list-filter',
  templateUrl: './suggestions-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TriStateCheckboxModule,
    FilterCardComponent,
    TextInputComponent
  ]
})
export class SuggestionsListFilterComponent extends FilterBaseComponent<EmoteSuggestionsListRequest> {
  override configure(): void {
    this.filterId = 'emote/suggestions-list';
  }

  override createForm(): IForm<EmoteSuggestionsListRequest> {
    return {
      guildId: this.createControl(),
      fromUserId: this.createControl(),
      suggestedFrom: this.createControl(),
      suggestedTo: this.createControl(),
      nameContains: this.createControl(),
      approvalState: this.createControl(),
    };
  }
}
