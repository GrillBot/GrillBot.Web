import { forkJoin, Observable } from 'rxjs';
import { Dictionary } from 'src/app/core/models/common';
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';

interface UnverifyQuery {
    byOperation: Dictionary<string, number>;
    byDate: Dictionary<string, number>;
}

@Component({
    selector: 'app-unverify',
    templateUrl: './unverify.component.html'
})
export class UnverifyComponent implements OnInit {
    statistics$: Observable<UnverifyQuery>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = forkJoin({
            byOperation: this.service.getUnverifyLogsStatisticsByOperation(),
            byDate: this.service.getUnverifyLogsStatisticsByDate()
        });
    }

}
