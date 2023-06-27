import { DashboardInfo } from './../../../core/models/system';
import { Component, ViewChild } from '@angular/core';
import { ApiRequestsComponent } from '../api-requests/api-requests.component';
import { CommandsComponent } from '../commands/commands.component';
import { JobsComponent } from '../jobs/jobs.component';
import { TodayAvgTimesComponent } from '../today-avg-times/today-avg-times.component';
import { CommonInfoComponent } from '../common-info/common-info.component';
import { ActiveOperationsComponent } from '../active-operations/active-operations.component';
import { OperationStatsComponent } from '../operation-stats/operation-stats.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    @ViewChild('apiV1') apiV1: ApiRequestsComponent;
    @ViewChild('apiV2') apiV2: ApiRequestsComponent;
    @ViewChild(CommandsComponent) commands: CommandsComponent;
    @ViewChild(JobsComponent) jobs: JobsComponent;
    @ViewChild(TodayAvgTimesComponent) todayAvgTimes: TodayAvgTimesComponent;
    @ViewChild(CommonInfoComponent) commonInfo: CommonInfoComponent;
    @ViewChild(ActiveOperationsComponent) activeOperations: ActiveOperationsComponent;
    @ViewChild(OperationStatsComponent) operationStats: OperationStatsComponent;

    data: DashboardInfo;
    loading = true;

    reload(): void {
        this.apiV1.ngOnInit();
        this.apiV2.ngOnInit();
        this.commands.ngOnInit();
        this.jobs.ngOnInit();
        this.todayAvgTimes.ngOnInit();
        this.commonInfo.ngOnInit();
        this.activeOperations.ngOnInit();
        this.operationStats.ngOnInit();
    }

}
