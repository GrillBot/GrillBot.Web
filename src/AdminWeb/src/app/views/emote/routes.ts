import { Routes } from "@angular/router";
import { EmoteListFilterComponent } from "./emote-list/emote-list-filter/emote-list-filter.component";
import { EmoteListListComponent } from "./emote-list/emote-list-list/emote-list-list.component";
import { SupportListFilterComponent } from "./support-list/support-list-filter/support-list-filter.component";
import { SupportListListComponent } from "./support-list/support-list-list/support-list-list.component";

export const routes: Routes = [
  {
    path: 'stats',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Statistika',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)'),
      filterComponent: EmoteListFilterComponent,
      listComponent: EmoteListListComponent
    }
  },
  {
    path: 'supported',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Podporované emoty',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)'),
      filterComponent: SupportListFilterComponent,
      listComponent: SupportListListComponent
    }
  },
  {
    path: 'stats/:guildId/:emoteId',
    loadComponent: () => import('./emote-detail/emote-detail.component').then(m => m.EmoteDetailComponent),
    data: {
      title: 'Detail emote',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)')
    }
  },
  {
    path: 'suggestions',
    loadChildren: () => import('./suggestions/routes').then(m => m.routes),
    data: {
      title: 'Návrhy',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)')
    }
  }
]
