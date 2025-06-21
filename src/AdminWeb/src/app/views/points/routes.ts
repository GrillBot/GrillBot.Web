import { Routes } from "@angular/router";
import { TransactionsFilterComponent } from "./transactions/transactions-filter/transactions-filter.component";
import { TransactionsListComponent } from "./transactions/transactions-list/transactions-list.component";
import { UsersFilterComponent } from "./users/users-filter/users-filter.component";
import { UsersListComponent } from "./users/users-list/users-list.component";

export const routes: Routes = [
  {
    path: 'leaderboard',
    loadComponent: () => import('./leaderboard/points-leaderboard.component').then(m => m.PointsLeaderboardComponent),
    data: {
      title: 'Body / Leaderboard',
      canActivate: (perms: string[]) => perms.includes('Points(Leaderboard)')
    }
  },
  {
    path: 'transactions',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Body / Transakce',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)'),
      filterId: 'points/transactions',
      filterComponent: TransactionsFilterComponent,
      listComponent: TransactionsListComponent
    }
  },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats.component').then(m => m.ChartsComponent),
    data: {
      title: 'Body / Statistiky',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)'),
      filterId: 'points/stats'
    }
  },
  {
    path: 'users',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Body / Uživatelé',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)'),
      filterComponent: UsersFilterComponent,
      listComponent: UsersListComponent
    }
  },
  {
    path: 'transfer',
    loadComponent: () => import('./transfer/transfer.component').then(m => m.TransferComponent),
    data: {
      title: 'Body / Převod bodů',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)')
    }
  }
];
