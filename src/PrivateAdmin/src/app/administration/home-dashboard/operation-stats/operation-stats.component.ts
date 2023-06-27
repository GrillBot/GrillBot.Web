import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { List } from 'src/app/core/models/common';
import { CounterStats } from 'src/app/core/models/system';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'app-operation-stats',
    templateUrl: './operation-stats.component.html'
})
export class OperationStatsComponent implements OnInit {
    loading: boolean;
    items: List<CounterStats>;

    constructor(private dashboard: DashboardService) { }

    ngOnInit(): void {
        this.loading = true;
        this.items = null;

        this.dashboard.getOperationStats()
            .pipe(catchError(err => {
                this.items = null;
                this.loading = false;
                return throwError(() => err);
            }))
            .subscribe(items => {
                this.items = items;
                this.loading = false;
            });
    }
}
