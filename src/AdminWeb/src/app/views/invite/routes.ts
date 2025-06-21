import { Routes } from "@angular/router";
import { InvitesListFilterComponent } from "./used-invites/invites-list-filter/invites-list-filter.component";
import { UsedInvitesListComponent } from "./used-invites/used-invites-list/used-invites-list.component";
import { CachedInvitesListComponent } from "./cached-invites/cached-invites-list/cached-invites-list.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'used-invites/list',
    pathMatch: 'full'
  },
  {
    path: 'used-invites',
    loadComponent: () => import('../../components').then(c => c.ListContainerComponent),
    data: {
      title: 'Použité pozvánky',
      canActivate: (perms: string[]) => perms.includes('Invite(Admin)'),
      filterId: 'invite/used-invites',
      filterComponent: InvitesListFilterComponent,
      listComponent: UsedInvitesListComponent
    }
  },
  {
    path: 'cached-invites',
    loadComponent: () => import('../../components').then(c => c.ListContainerComponent),
    data: {
      title: 'Cache',
      canActivate: (perms: string[]) => perms.includes('Invite(Admin)'),
      filterId: 'invite/cached-invites',
      filterComponent: InvitesListFilterComponent,
      listComponent: CachedInvitesListComponent
    }
  }
];
