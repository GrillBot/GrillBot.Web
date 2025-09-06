import { Routes } from "@angular/router";
import { CurrentStatusFilterComponent } from "./current-status/current-status-filter/current-status-filter.component";
import { CurrentStatusListComponent } from "./current-status/curernt-status-list/current-status-list.component";

export const routes: Routes = [
  {
    path: 'current-status',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Odebrání přístupu | Aktuální stav',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)'),
      filterComponent: CurrentStatusFilterComponent,
      listComponent: CurrentStatusListComponent
    }
  }
];
