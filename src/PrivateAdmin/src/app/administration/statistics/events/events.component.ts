import { Observable, forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Dictionary, List } from 'src/app/core/models/common';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { SystemService } from 'src/app/core/services/system.service';

interface EventsQuery {
    chart: Dictionary<string, number>;
    log: List<string>;
}

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
    statistics$: Observable<EventsQuery>;

    constructor(
        private service: StatisticsService,
        private system: SystemService
    ) { }

    ngOnInit(): void {
        this.statistics$ = forkJoin({
            chart: this.service.getEventStatistics(),
            log: this.system.getEventLog()
        });
    }

}
