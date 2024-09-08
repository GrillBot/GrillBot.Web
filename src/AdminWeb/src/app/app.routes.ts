import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'web',
    pathMatch: 'full'
  },
  {
    path: 'web',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Přihlášení'
    }
  },
  {
    path: '**',
    loadComponent: () => import('./views/pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    data: {
      title: 'Stránka nenalezena'
    }
  }
];
