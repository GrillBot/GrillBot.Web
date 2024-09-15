import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'common',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: 'Dashboard / Bot',
      canActivate: (permissions: string[]) => permissions.includes('Dashboard(Admin)')
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services-dashboard.component').then(m => m.ServicesDashboardComponent),
    data: {
      title: 'Dashboard / Služby',
      canActivate: (permissions: string[]) => permissions.includes('Dashboard(Admin)')
    }
  }
]
