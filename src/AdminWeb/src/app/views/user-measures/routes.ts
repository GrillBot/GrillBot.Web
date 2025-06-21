import { Routes } from "@angular/router";
import { MeasuresListFilterComponent } from "./measures-list/measures-list-filter/measures-list-filter.component";
import { MeasuresListListComponent } from "./measures-list/measures-list-list/measures-list-list.component";

export const routes: Routes = [
  {
    path: 'measures-list',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Uživatelská opatření / Seznam opatření',
      canActivate: (perms: string[]) => perms.includes('UserMeasures(Admin)'),
      filterComponent: MeasuresListFilterComponent,
      listComponent: MeasuresListListComponent
    }
  },
  {
    path: 'create-warning',
    loadComponent: () => import('./create-warning/create-warning.component').then(m => m.CreateWarningComponent),
    data: {
      title: 'Uživatelská opatření / Vytvořit varování',
      canActivate: (perms: string[]) => perms.includes('UserMeasures(Admin)')
    }
  }
];
