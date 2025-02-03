import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'stats',
    loadComponent: () => import('./emote-list/emote-list.component').then(m => m.EmoteListComponent),
    data: {
      title: 'Statistika',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)')
    }
  },
  {
    path: 'supported',
    loadComponent: () => import('./support-list/support-list.component').then(m => m.SupportListComponent),
    data: {
      title: 'Podporované emoty',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)')
    }
  }
]
