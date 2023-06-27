import { Component, OnInit } from '@angular/core';
import { TodayAvgTimes } from 'src/app/core/models/services/services';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'app-today-avg-times',
    templateUrl: './today-avg-times.component.html'
})
export class TodayAvgTimesComponent implements OnInit {
    data: TodayAvgTimes;
    loading = false;

    constructor(private dashboard: DashboardService) { }

    ngOnInit(): void {
        this.data = null;
        this.loading = true;

        this.dashboard.getTodayAvgTimes().subscribe(data => {
            this.data = data;
            this.loading = false;
        });
    }
}
