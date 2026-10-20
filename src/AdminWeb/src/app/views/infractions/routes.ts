import { Routes } from "@angular/router";
import { InfractionListFilterComponent } from "./infraction-list/infraction-list-filter/infraction-list-filter.component";
import { InfractionListListComponent } from "./infraction-list/infraction-list-list/infraction-list-list.component";

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Uživatelská opatření / Seznam opatření',
      canActivate: (perms: string[]) => perms.includes('Infractions(Admin)'),
      filterComponent: InfractionListFilterComponent,
      listComponent: InfractionListListComponent
    }
  },
  {
    path: 'create-warning',
    loadComponent: () => import('./create-warning/create-warning.component').then(m => m.CreateWarningComponent),
    data: {
      title: 'Uživatelská opatření / Vytvořit varování',
      canActivate: (perms: string[]) => perms.includes('Infractions(Admin)')
    }
  }
];
