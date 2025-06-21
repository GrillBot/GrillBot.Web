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
      },
      {
        path: 'reminder',
        loadChildren: () => import('./views/reminder/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'searching',
        loadChildren: () => import('./views/searching/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'emote',
        loadChildren: () => import('./views/emote/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'auditlog',
        loadChildren: () => import('./views/auditlog/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'invite',
        loadChildren: () => import('./views/invite/routes').then(m => m.routes),
        data: {
          canActivate: (_: string[]) => true
        }
      },
      {
        path: 'auto-reply',
        loadChildren: () => import('./views/auto-reply/routes').then(m => m.routes),
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
