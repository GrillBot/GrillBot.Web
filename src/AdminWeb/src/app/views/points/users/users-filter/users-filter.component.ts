import { Component } from "@angular/core";
import { FilterBaseComponent } from "../../../../components/filters";
import { UserListRequest } from "../../../../core/models/points/user-list-request";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CardComponent, ColComponent, FormLabelDirective, RowComponent } from "@coreui/angular";
import { CardHeaderComponent, FormCardBodyComponent } from "../../../../components";
import { GuildLookupComponent } from "../../../../components/lookups";
import { FilterButtonsComponent } from "../../../../components/filters/filter-buttons/filter-buttons.component";

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardComponent,
    CardHeaderComponent,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    GuildLookupComponent,
    FilterButtonsComponent,
    FormCardBodyComponent
  ]
})
export class UsersFilterComponent extends FilterBaseComponent<UserListRequest> {
  override configure(): void {
    this.filterId = 'points/users';
  }

  override createForm(): IForm<UserListRequest> {
    return {
      guildId: this.createControl()
    };
  }
}
