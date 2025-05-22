import { Component } from "@angular/core";
import {
  CheckboxComponent, DatetimeRangeComponent, FilterBaseComponent, FilterCardComponent, GuildLookupComponent, RadioGroupComponent,
  RadioItem, TextInputComponent, UserLookupComponent
} from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { EmoteStatisticsListFilter } from "../../../../core/models/emote/emote-statistics-list-request";
import { ReactiveFormsModule } from "@angular/forms";
import {
  ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent
} from "@coreui/angular";

@Component({
  selector: 'app-emote-list-filter',
  templateUrl: './emote-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    InputGroupComponent,
    FormControlDirective,
    UserLookupComponent,
    GuildLookupComponent,
    CheckboxComponent,
    RadioGroupComponent,
    FilterCardComponent,
    TextInputComponent,
    DatetimeRangeComponent
  ]
})
export class EmoteListFilterComponent extends FilterBaseComponent<EmoteStatisticsListFilter> {
  unsupportedItems: RadioItem[] = [
    { label: 'Podporované', value: false },
    { label: 'Nepodporované', value: true }
  ]

  override configure(): void {
    this.filterId = 'emote/emote-list';
  }

  override createForm(): IForm<EmoteStatisticsListFilter> {
    return {
      unsupported: this.createControl({ validators: [] }, false),
      guildId: this.createControl(),
      userId: this.createControl(),
      useCountFrom: this.createControl(),
      useCountTo: this.createControl(),
      firstOccurence: this.createControl(),
      lastOccurence: this.createControl(),
      ignoreAnimated: this.createControl({ validators: [] }, false),
      emoteName: this.createControl(),
      emoteFullId: this.createControl()
    }
  }
}
