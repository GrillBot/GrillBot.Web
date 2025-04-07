import { Component } from "@angular/core";
import { InvitesListFilterComponent } from "./invites-list-filter/invites-list-filter.component";
import { UsedInvitesListComponent } from "./used-invites-list/used-invites-list.component";

@Component({
  template: '<app-invites-list-filter (filterEvent)="list.onFilterChanged($event)" /><app-used-invites-list #list />',
  standalone: true,
  imports: [InvitesListFilterComponent, UsedInvitesListComponent]
})
export class UsedInvitesComponent { }
