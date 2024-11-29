import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./searching-list/searching-list.component').then(m => m.SearchingListComponent),
    data: {
      title: 'Hledání',
      canActivate: (perms: string[]) => perms.includes('Searching(Admin)')
    }
  }
];
