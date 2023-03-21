import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonInfoComponent } from './common-info/common-info.component';
import { ActiveOperationsComponent } from './active-operations/active-operations.component';
import { OperationStatsComponent } from './operation-stats/operation-stats.component';
import { TodayAvgTimesComponent } from './today-avg-times/today-avg-times.component';
import { ApiRequestsComponent } from './api-requests/api-requests.component';
import { JobsComponent } from './jobs/jobs.component';
import { CommandsComponent } from './commands/commands.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
    declarations: [
        DashboardComponent,
        CommonInfoComponent,
        ActiveOperationsComponent,
        OperationStatsComponent,
        TodayAvgTimesComponent,
        ApiRequestsComponent,
        JobsComponent,
        CommandsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeDashboardModule { }
