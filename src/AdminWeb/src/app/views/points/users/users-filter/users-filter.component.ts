import { Component } from "@angular/core";
import { FilterBaseComponent, FilterCardComponent } from "../../../../components/filters";
import { UserListRequest } from "../../../../core/models/points/user-list-request";
import { IForm } from "../../../../core/models/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ColComponent, RowComponent } from "@coreui/angular";
import { GuildLookupComponent } from "../../../../components/lookups";

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RowComponent,
    ColComponent,
    GuildLookupComponent,
    FilterCardComponent
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
