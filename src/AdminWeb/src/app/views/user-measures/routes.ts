import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'measures-list',
    loadComponent: () => import('./measures-list/measures-list.component').then(m => m.MeasuresListComponent),
    data: {
      title: 'Uživatelská opatření / Seznam opatření',
      canActivate: (perms: string[]) => perms.includes('UserMeasures(Admin)')
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
