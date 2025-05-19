import { Component } from "@angular/core";
import {
  CheckboxComponent, FilterBaseComponent, FilterCardComponent, GuildLookupComponent, RadioGroupComponent,
  RadioItem, UserLookupComponent
} from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { EmoteStatisticsListRequest } from "../../../../core/models/emote/emote-statistics-list-request";
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
    FilterCardComponent
  ]
})
export class EmoteListFilterComponent extends FilterBaseComponent<EmoteStatisticsListRequest> {
  unsupportedItems: RadioItem[] = [
    { label: 'Podporované', value: false },
    { label: 'Nepodporované', value: true }
  ]

  override configure(): void {
    this.filterId = 'emote/emote-list';
  }

  override createForm(): IForm<EmoteStatisticsListRequest> {
    return {
      unsupported: this.createControl({ validators: [] }, false),
      guildId: this.createControl(),
      userId: this.createControl(),
      useCountFrom: this.createControl(),
      useCountTo: this.createControl(),
      firstOccurenceFrom: this.createControl(),
      firstOccurenceTo: this.createControl(),
      lastOccurenceFrom: this.createControl(),
      lastOccurenceTo: this.createControl(),
      ignoreAnimated: this.createControl({ validators: [] }, false),
      emoteName: this.createControl(),
      emoteFullId: this.createControl()
    }
  }
}
