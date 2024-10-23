import { Component } from "@angular/core";
import { UsersFilterComponent } from "./users-filter/users-filter.component";
import { UsersListComponent } from "./users-list/users-list.component";

@Component({
  templateUrl: './users.component.html',
  standalone: true,
  imports: [
    UsersFilterComponent,
    UsersListComponent
  ]
})
export class UsersComponent { }
