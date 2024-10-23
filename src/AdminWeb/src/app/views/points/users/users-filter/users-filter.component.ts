import { Component } from "@angular/core";
import { FilterBaseComponent } from "../../../../components/filters";
import { UserListRequest } from "../../../../core/models/points/user-list-request";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { CardBodyComponent, CardComponent, ColComponent, FormDirective, FormLabelDirective, RowComponent } from "@coreui/angular";
import { CardHeaderComponent } from "../../../../components";
import { VisibilityDirective } from "../../../../core/directives";
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
    CardBodyComponent,
    VisibilityDirective,
    FormDirective,
    RowComponent,
    ColComponent,
    FormLabelDirective,
    GuildLookupComponent,
    FilterButtonsComponent
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
