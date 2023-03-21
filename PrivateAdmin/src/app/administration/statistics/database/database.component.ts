import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DatabaseStatistics } from 'src/app/core/models/statistics';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html'
})
export class DatabaseComponent implements OnInit {
    statistics$: Observable<DatabaseStatistics>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getDbStatus();
    }
}
