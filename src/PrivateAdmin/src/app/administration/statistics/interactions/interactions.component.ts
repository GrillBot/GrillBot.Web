import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InteractionStatistics } from 'src/app/core/models/statistics';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
    selector: 'app-interactions',
    templateUrl: './interactions.component.html'
})
export class InteractionsComponent implements OnInit {
    statistics$: Observable<InteractionStatistics>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getInteractionsStatus();
    }
}
