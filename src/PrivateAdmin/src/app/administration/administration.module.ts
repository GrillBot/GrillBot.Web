import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { AuthGuard } from '../core/services/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./home-dashboard/home-dashboard.module').then(mod => mod.HomeDashboardModule),
                data: { title: 'Domů', id: 'home' }
            },
            {
                path: 'servers',
                loadChildren: () => import('./guilds/guilds.module').then(mod => mod.GuildsModule),
                data: { title: 'Servery', id: 'servers' }
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
                data: { title: 'Uživatelé', id: 'users' }
            },
            {
                path: 'audit-log',
                loadChildren: () => import('./audit-log/audit-log.module').then(mod => mod.AuditLogModule),
                data: { title: 'Audit log', id: 'audit-log' }
            },
            {
                path: 'channels',
                loadChildren: () => import('./channels/channels.module').then(mod => mod.ChannelsModule),
                data: { title: 'Kanály', id: 'channels' }
            },
            {
                path: 'invites',
                loadChildren: () => import('./invites/invites.module').then(mod => mod.InvitesModule),
                data: { title: 'Pozvánky', id: 'invites' }
            },
            {
                path: 'reminder',
                loadChildren: () => import('./reminders/reminders.module').then(mod => mod.RemindersModule),
                data: { title: 'Reminder', id: 'reminder' }
            },
            {
                path: 'search',
                loadChildren: () => import('./searching/searching.module').then(mod => mod.SearchingModule),
                data: { title: 'Hledání', id: 'searching' }
            },
            {
                path: 'services',
                loadChildren: () => import('./services/services.module').then(mod => mod.ServicesModule),
                data: { title: 'Služby', id: 'services' }
            },
            {
                path: 'statistics',
                loadChildren: () => import('./statistics/statistics.module').then(mod => mod.StatisticsModule),
                data: { title: 'Statistiky', id: 'statistics' }
            },
            {
                path: 'jobs',
                loadChildren: () => import('./jobs/jobs.module').then(mod => mod.JobsModule),
                data: { title: 'Naplánované úlohy', id: 'jobs' }
            },
            {
                path: 'api-clients',
                loadChildren: () => import('./api-clients/api-clients.module').then(mod => mod.ApiClientsModule),
                data: { title: 'API v2 - Klienti', id: 'api-clients' }
            },
            {
                path: 'unverify',
                loadChildren: () => import('./unverify/unverify.module').then(mod => mod.UnverifyModule),
                data: { title: 'Unverify', id: 'unverify' }
            },
            {
                path: 'selfunverify',
                loadChildren: () => import('./selfunverify/selfunverify.module').then(mod => mod.SelfunverifyModule),
                data: { title: 'SelfUnverify', id: 'selfunverify' }
            },
            {
                path: 'auto-reply',
                loadChildren: () => import('./auto-reply/auto-reply.module').then(mod => mod.AutoReplyModule),
                data: { title: 'Automatické odpovědi', id: 'auto-reply' }
            },
            {
                path: 'emotes',
                loadChildren: () => import('./emotes/emotes.module').then(mod => mod.EmotesModule),
                data: { title: 'Správa emotů', id: 'emotes' }
            },
            {
                path: 'points',
                loadChildren: () => import('./points/points.module').then(mod => mod.PointsModule),
                data: { title: 'Body', id: 'points' }
            },
            {
                path: 'userMeasures',
                loadChildren: () => import('./user-measures/user-measures.module').then(mod => mod.UserMeasuresModule),
                data: { title: 'Uživatelská opatření', id: 'userMeasures' }
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [
        AdministrationComponent,
        HeaderComponent,
        SidenavComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdministrationModule { }
