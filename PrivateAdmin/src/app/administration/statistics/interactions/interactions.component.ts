import { Component, OnInit } from '@angular/core';
import { ObservableList } from 'src/app/core/models/common';
import { StatisticItem } from 'src/app/core/models/statistics';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
    selector: 'app-interactions',
    templateUrl: './interactions.component.html'
})
export class InteractionsComponent implements OnInit {
    statistics$: ObservableList<StatisticItem>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getInteractionsStatus();
    }
}
