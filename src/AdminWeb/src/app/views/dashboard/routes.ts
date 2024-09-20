import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'common',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent),
    data: {
      title: 'Dashboard / Bot',
      canActivate: (perms: string[]) =>
        perms.includes('Dashboard(Admin)') || perms.includes('UserMeasures(Admin)')
    }
  },
  {
    path: 'services',
    loadComponent: () => import('./services-dashboard/services-dashboard.component').then(m => m.ServicesDashboardComponent),
    data: {
      title: 'Dashboard / Služby',
      canActivate: (perms: string[]) => perms.includes('Dashboard(Admin)')
    }
  },
  {
    path: 'services/:serviceId',
    loadComponent: () => import('./service-detail/service-detail.component').then(m => m.ServiceDetailComponent),
    data: {
      title: 'Dashboard / Služby / Detail',
      canActivate: (perms: string[]) => perms.includes('Dashboard(Admin)')
    }
  },
  {
    path: 'api',
    loadComponent: () => import('./api/api-dashboard.component').then(m => m.ApiDashboardComponent),
    data: {
      title: 'Dashboard / API',
      canActivate: (perms: string) => perms.includes('Dashboard(Admin)') && perms.includes('AuditLog(Admin)')
    }
  }
]
