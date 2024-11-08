import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reminder-list/reminder-list.component').then(c => c.ReminderListComponent),
    data: {
      title: 'Reminder',
      canActivate: (perms: string[]) => perms.includes('Remind(Admin)')
    }
  }
];
