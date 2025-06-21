import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auto-reply-list/auto-reply-list.component').then(c => c.AutoReplyListComponent),
    data: {
      title: 'Automatické odpovědi',
      canActivate: (perms: string[]) => perms.includes('Message(Admin)')
    }
  }
];
