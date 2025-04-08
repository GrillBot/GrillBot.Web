import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'used-invites/list',
    pathMatch: 'full'
  },
  {
    path: 'used-invites',
    loadComponent: () => import('./used-invites/used-invites.component').then(c => c.UsedInvitesComponent),
    data: {
      title: 'Použité pozvánky',
      canActivate: (perms: string[]) => perms.includes('Invite(Admin)'),
      filterId: 'invite/used-invites'
    }
  },
  {
    path: 'cached-invites',
    loadComponent: () => import('./cached-invites/cached-invites.component').then(c => c.CachedInvitesComponent),
    data: {
      title: 'Cache',
      canActivate: (perms: string[]) => perms.includes('Invite(Admin)'),
      filterId: 'invite/cached-invites'
    }
  }
];
