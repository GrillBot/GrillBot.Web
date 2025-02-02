import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'stats',
    loadComponent: () => import('./emote-list/emote-list.component').then(m => m.EmoteListComponent),
    data: {
      title: 'Emoty',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)')
    }
  }
]
