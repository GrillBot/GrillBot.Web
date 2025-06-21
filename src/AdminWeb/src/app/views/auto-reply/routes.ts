import { Routes } from "@angular/router";
import { AutoReplyListFilterComponent } from "./auto-reply-list/auto-reply-list-filter/auto-reply-list-filter.component";
import { AutoReplyListListComponent } from "./auto-reply-list/auto-reply-list-list/auto-reply-list-list.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../components').then(m => m.ListContainerComponent),
    data: {
      title: 'Automatické odpovědi',
      canActivate: (perms: string[]) => perms.includes('Message(Admin)'),
      filterComponent: AutoReplyListFilterComponent,
      listComponent: AutoReplyListListComponent
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
