import { Routes } from "@angular/router";
import { SearchingListListComponent } from "./searching-list/searching-list-list/searching-list-list.component";
import { SearchingListFilterComponent } from "./searching-list/searching-list-filter/searching-list-filter.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Hledání',
      canActivate: (perms: string[]) => perms.includes('Searching(Admin)'),
      listComponent: SearchingListListComponent,
      filterComponent: SearchingListFilterComponent
    }
  }
];
