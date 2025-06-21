import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auto-reply-list/auto-reply-list.component').then(c => c.AutoReplyListComponent),
    data: {
      title: 'Automatické odpovědi',
      canActivate: (perms: string[]) => perms.includes('Message(Admin)')
    }
  },
  {
    path: 'create',
    loadComponent: () => import('./auto-reply-detail/auto-reply-detail.component').then(m => m.AutoReplyDetailComponent),
    data: {
      title: 'Automatické odpovědi | Vytvoření',
      canActivate: (perms: string[]) => perms.includes('Message(Admin)')
    }
  },
  {
    path: ':id',
    loadComponent: () => import('./auto-reply-detail/auto-reply-detail.component').then(m => m.AutoReplyDetailComponent),
    data: {
      title: 'Automatické odpovědi | Detail',
      canActivate: (perms: string[]) => perms.includes('Message(Admin)')
    }
  }
];
