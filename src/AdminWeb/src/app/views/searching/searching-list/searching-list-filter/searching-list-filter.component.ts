import { Component } from "@angular/core";
import {
  CheckboxComponent, FilterBaseComponent, FilterCardComponent, GuildLookupComponent, UserLookupComponent
} from "../../../../components";
import { SearchingListRequest } from "../../../../core/models/searching/searching-list-request";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent } from "@coreui/angular";
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
    FormLabelDirective,
    InputGroupComponent,
    FormControlDirective,
    UserLookupComponent,
    GuildLookupComponent,
    ChannelLookupComponent,
    CheckboxComponent,
    FilterCardComponent
  ]
})
export class SearchingListFilterComponent extends FilterBaseComponent<SearchingListRequest> {
  override configure(): void {
    this.filterId = 'searching/searching-list';
  }

  override createForm(): IForm<SearchingListRequest> {
    return {
      userId: this.createControl(),
      guildId: this.createControl(),
      channelId: this.createControl(),
      messageQuery: this.createControl(),
      createdFrom: this.createControl(),
      createdTo: this.createControl(),
      validFrom: this.createControl(),
      validTo: this.createControl(),
      hideInvalid: this.createControl({ validators: [] }, true),
      showDeleted: this.createControl({ validators: [] }, false)
    }
  }
}
