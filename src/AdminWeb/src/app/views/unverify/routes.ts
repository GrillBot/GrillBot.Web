import { Routes } from "@angular/router";
import { CurrentStatusFilterComponent } from "./current-status/current-status-filter/current-status-filter.component";
import { CurrentStatusListComponent } from "./current-status/curernt-status-list/current-status-list.component";
import { KeepablesFilterComponent } from "./keepables/keepables-filter/keepables-filter.component";
import { KeepablesListComponent } from "./keepables/keepables-list/keepables-list.component";
import { LogFilterComponent } from "./log/log-filter/log-filter.component";
import { LogListComponent } from "./log/log-list/log-list.component";

export const routes: Routes = [
  {
    path: 'current-status',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Odebrání přístupu | Aktuální stav',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)'),
      filterComponent: CurrentStatusFilterComponent,
      listComponent: CurrentStatusListComponent
    }
  },
  {
    path: 'current-status/:guildId/:userId',
    loadComponent: () => import('./current-status/current-status-detail/current-status-detail.component').then(m => m.CurrentStatusDetailComponent),
    data: {
      title: 'Odebrání přístupu | Aktuální stav | Detail odebraného přístupu',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)')
    }
  },
  {
    path: 'keepables',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Odebrání přístupu | Ponechatelné přístupy',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)'),
      filterComponent: KeepablesFilterComponent,
      listComponent: KeepablesListComponent
    }
  },
  {
    path: 'keepables/create',
    loadComponent: () => import('./keepables/keepables-create/keepables-create.component').then(m => m.KeepablesCreateComponent),
    data: {
      title: 'Odebrání přístupu | Ponechatelné přístupy | Vytvoření',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)')
    }
  },
  {
    path: 'log',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Odebrání přístupu | Historie',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)'),
      filterComponent: LogFilterComponent,
      listComponent: LogListComponent
    }
  },
  {
    path: 'log/:id',
    loadComponent: () => import('./log/log-detail/log-detail.component').then(m => m.LogDetailComponent),
    data: {
      title: 'Odebrání přístupu | Historie | Detail',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)')
    }
  },
  {
    path: 'stats',
    loadComponent: () => import('./statistics/statistics.component').then(m => m.StatisticsComponent),
    data: {
      title: 'Odebrání přístupu | Statistiky',
      canActivate: (perms: string[]) => perms.includes('Unverify(Admin)')
    }
  }
];
