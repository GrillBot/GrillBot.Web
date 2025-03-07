import { Component } from "@angular/core";
import {
  CardHeaderComponent, CheckboxComponent, FilterBaseComponent, FilterButtonsComponent,
  FilterStoreComponent, FormCardBodyComponent, GuildLookupComponent, RadioGroupComponent,
  RadioItem, UserLookupComponent
} from "../../../../components";
import { IForm } from "../../../../core/models/common";
import { EmoteStatisticsListRequest } from "../../../../core/models/emote/emote-statistics-list-request";
import { ReactiveFormsModule } from "@angular/forms";
import {
  CardComponent, CardFooterComponent, ColComponent, FormControlDirective,
  FormLabelDirective, InputGroupComponent, RowComponent
} from "@coreui/angular";
import { VisibilityDirective } from "../../../../core/directives";

@Component({
  selector: 'app-emote-list-filter',
  templateUrl: './emote-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    VisibilityDirective,
    FormLabelDirective,
    InputGroupComponent,
    FormControlDirective,
    UserLookupComponent,
    GuildLookupComponent,
    FilterButtonsComponent,
    CheckboxComponent,
    FormCardBodyComponent,
    RadioGroupComponent,
    CardFooterComponent,
    FilterStoreComponent
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
