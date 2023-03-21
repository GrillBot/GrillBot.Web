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
            { path: 'operations', component: OperationsComponent }
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
        OperationsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class StatisticsModule { }
