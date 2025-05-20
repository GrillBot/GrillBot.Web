import { Component } from "@angular/core";
import {
  CheckboxComponent, DatetimeRangeComponent, FilterBaseComponent, FilterCardComponent, GuildLookupComponent, TextInputComponent, UserLookupComponent
} from "../../../../components";
import { SearchingListFilter } from "../../../../core/models/searching/searching-list-request";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";
import { IForm } from "../../../../core/models/common";
import { ChannelLookupComponent } from "../../../../components/lookups/channel-lookup/channel-lookup.component";

@Component({
  selector: 'app-searching-list-filter',
  templateUrl: './searching-list-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    UserLookupComponent,
    GuildLookupComponent,
    ChannelLookupComponent,
    CheckboxComponent,
    FilterCardComponent,
    TextInputComponent,
    DatetimeRangeComponent
  ]
})
export class SearchingListFilterComponent extends FilterBaseComponent<SearchingListFilter> {
  override configure(): void {
    this.filterId = 'searching/searching-list';
  }

  override createForm(): IForm<SearchingListFilter> {
    return {
      userId: this.createControl(),
      guildId: this.createControl(),
      channelId: this.createControl(),
      messageQuery: this.createControl(),
      hideInvalid: this.createControl({ validators: [] }, true),
      showDeleted: this.createControl({ validators: [] }, false),
      created: this.createControl(),
      valid: this.createControl()
    }
  }
}
