import { AuditLogComponent } from './audit-log/audit-log.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatabaseComponent } from './database/database.component';
import { UnverifyComponent } from './unverify/unverify.component';
import { InteractionsComponent } from './interactions/interactions.component';
import { ApiComponent } from './api/api.component';
import { EventsComponent } from './events/events.component';
import { AvgTimesComponent } from './avg-times/avg-times.component';
import { OperationsComponent } from './operations/operations.component';
import { InteractionsUsersComponent } from './interactions-users/interactions-users.component';
import { ApiUsersComponent } from './api-users/api-users.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'auditLog', component: AuditLogComponent },
            { path: 'database', component: DatabaseComponent },
            { path: 'unverify', component: UnverifyComponent },
            { path: 'interactions', component: InteractionsComponent },
            { path: 'api', component: ApiComponent },
            { path: 'events', component: EventsComponent },
            { path: 'avgTimes', component: AvgTimesComponent },
            { path: 'operations', component: OperationsComponent },
            { path: 'interactions-users', component: InteractionsUsersComponent },
            { path: 'api-users-v1-private', component: ApiUsersComponent, data: { criteria: 'v1-private' } },
            { path: 'api-users-v1-public', component: ApiUsersComponent, data: { criteria: 'v1-public' } },
            { path: 'api-users-v2', component: ApiUsersComponent, data: { criteria: 'v2' } }
        ]
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        AuditLogComponent,
        DatabaseComponent,
        UnverifyComponent,
        InteractionsComponent,
        ApiComponent,
        EventsComponent,
        AvgTimesComponent,
        OperationsComponent,
        InteractionsUsersComponent,
        ApiUsersComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class StatisticsModule { }
