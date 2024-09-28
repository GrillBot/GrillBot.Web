import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'leaderboard',
    loadComponent: () => import('./leaderboard/points-leaderboard.component').then(m => m.PointsLeaderboardComponent),
    data: {
      title: 'Body / Leaderboard',
      canActivate: (perms: string[]) => perms.includes('Points(Leaderboard)')
    }
  }
];
