import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auditlog-list/auditlog-list.component').then(m => m.AuditLogListComponent),
    data: {
      title: 'Audit log',
      canActivate: (perms: string[]) => perms.includes('AuditLog(Admin)')
    }
  }
];
