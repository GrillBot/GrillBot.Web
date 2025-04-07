import { Component } from "@angular/core";
import { InvitesListFilterComponent } from "../used-invites/invites-list-filter/invites-list-filter.component";
import { CachedInvitesListComponent } from "./cached-invites-list/cached-invites-list.component";

@Component({
  template: '<app-invites-list-filter (filterEvent)="list.onFilterChanged($event)" /><app-cached-invites-list #list />',
  standalone: true,
  imports: [InvitesListFilterComponent, CachedInvitesListComponent]
})
export class CachedInvitesComponent { }
