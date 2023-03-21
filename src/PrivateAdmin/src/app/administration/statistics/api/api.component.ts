import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { ApiStatistics } from 'src/app/core/models/statistics';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html'
})
export class ApiComponent implements OnInit {
    statistics$: Observable<ApiStatistics>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getApiStatistics();
    }
}
