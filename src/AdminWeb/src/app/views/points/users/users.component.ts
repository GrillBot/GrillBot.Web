import { Component } from "@angular/core";
import { UsersFilterComponent } from "./users-filter/users-filter.component";
import { UsersListComponent } from "./users-list/users-list.component";

@Component({
  template: '<app-users-filter (filterEvent)="list.onFilterChanged($event)" /><app-users-list #list />',
  standalone: true,
  imports: [
    UsersFilterComponent,
    UsersListComponent
  ]
})
export class UsersComponent { }
