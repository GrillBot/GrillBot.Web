import { Routes } from "@angular/router";
import { ReminderListFilterComponent } from "./reminder-list/reminder-list-filter/reminder-list-filter.component";
import { ReminderListListComponent } from "./reminder-list/reminder-list-list/reminder-list-list.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../components').then(c => c.ListContainerComponent),
    data: {
      title: 'Reminder',
      canActivate: (perms: string[]) => perms.includes('Remind(Admin)'),
      filterComponent: ReminderListFilterComponent,
      listComponent: ReminderListListComponent
    }
  }
];
