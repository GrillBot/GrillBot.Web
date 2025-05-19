import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./suggestions-list/suggestions-list.component').then(m => m.SuggestionsListComponent),
    data: {
      title: 'Návrhy',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)')
    }
  }
];
