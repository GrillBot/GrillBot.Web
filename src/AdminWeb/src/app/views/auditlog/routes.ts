import { Routes } from "@angular/router";
import { AuditLogListFilterComponent } from "./auditlog-list/auditlog-list-filter/auditlog-list-filter.component";
import { AuditLogListListComponent } from "./auditlog-list/auditlog-list-list/auditlog-list-list.component";

export const routes: Routes = [
  {
    path: 'list',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Audit log',
      canActivate: (perms: string[]) => perms.includes('AuditLog(Admin)'),
      filterComponent: AuditLogListFilterComponent,
      listComponent: AuditLogListListComponent
    }
  },
  {
    path: 'statistics',
    loadComponent: () => import('./statistics/statistics.component').then(m => m.StatisticsComponent),
    data: {
      title: 'Audit log | Statistiky',
      canActivate: (perms: string[]) => perms.includes('AuditLog(Admin)')
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./auditlog-detail/auditlog-detail.component').then(m => m.AuditLogDetailComponent),
    data: {
      title: 'Audit log | Detail',
      canActivate: (perms: string[]) => perms.includes('AuditLog(Admin)')
    }
  }
];
