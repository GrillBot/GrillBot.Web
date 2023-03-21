import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvgExecutionTimes } from 'src/app/core/models/statistics';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
    selector: 'app-avg-times',
    templateUrl: './avg-times.component.html'
})
export class AvgTimesComponent implements OnInit {
    statistics$: Observable<AvgExecutionTimes>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getAvgTimes();
    }
}
