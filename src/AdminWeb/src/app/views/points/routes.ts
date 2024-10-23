import { Routes } from "@angular/router";

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
    loadComponent: () => import('./transactions/transactions.component').then(m => m.TransactionsComponent),
    data: {
      title: 'Body / Transakce',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)')
    }
  },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats.component').then(m => m.ChartsComponent),
    data: {
      title: 'Body / Statistiky',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)')
    }
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    data: {
      title: 'Body / Uživatelé',
      canActivate: (perms: string[]) => perms.includes('Points(Admin)')
    }
  }
];
