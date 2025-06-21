import { Routes } from "@angular/router";
import { SuggestionsListFilterComponent } from "./suggestions-list/suggestions-list-filter/suggestions-list-filter.component";
import { SuggestionsListListComponent } from "./suggestions-list/suggestions-list-list/suggestions-list-list.component";
import { VotesListFilterComponent } from "./votes-list/votes-list-filter/votes-list-filter.component";
import { VotesListListComponent } from "./votes-list/votes-list-list/votes-list-list.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Návrhy',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)'),
      filterComponent: SuggestionsListFilterComponent,
      listComponent: SuggestionsListListComponent
    }
  },
  {
    path: ':suggestionId/votes',
    loadComponent: () => import('../../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Hlasování',
      canActivate: (perms: string[]) => perms.includes('Emote(Admin)'),
      filterComponent: VotesListFilterComponent,
      listComponent: VotesListListComponent
    }
  }
];
