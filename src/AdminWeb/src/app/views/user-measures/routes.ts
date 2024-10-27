import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'measures-list',
    loadComponent: () => import('./measures-list/measures-list.component').then(m => m.MeasuresListComponent),
    data: {
      title: 'Uživatelská opatření / Seznam opatření',
      canActivate: (perms: string[]) => perms.includes('UserMeasures(Admin)')
    }
  }
];
