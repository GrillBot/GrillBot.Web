import { Component } from "@angular/core";
import { FilterBaseComponent, FilterCardComponent, GuildLookupComponent } from "../../../../components";
import { ActiveUnverifyListRequest } from "../../../../core/models/unverify/active-unverify-list-request";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";
import { IForm } from "../../../../core/models/common";

@Component({
  templateUrl: './current-status-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    GuildLookupComponent,
    FilterCardComponent
  ]
})
export class CurrentStatusFilterComponent extends FilterBaseComponent<ActiveUnverifyListRequest> {
  override configure(): void {
    this.filterId = 'unverify/current-status';
  }

  override createForm(): IForm<ActiveUnverifyListRequest> {
    return {
      guildId: this.createControl()
    };
  }
}
