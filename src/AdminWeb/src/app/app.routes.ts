import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { AuthenticationGuard } from './core/guards/authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'web',
    pathMatch: 'full'
  },
  {
    path: 'web',
    component: DefaultLayoutComponent,
    canActivate: [AuthorizationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'points',
        loadChildren: () => import('./views/points/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'user-measures',
        loadChildren: () => import('./views/user-measures/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      }
    ]
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
