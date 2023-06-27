import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Dictionary } from 'src/app/core/models/common';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-active-operations',
    templateUrl: './active-operations.component.html'
})
export class ActiveOperationsComponent implements OnInit {
    loading: boolean;
    items: Dictionary<string, number>;

    constructor(private dashboard: DashboardService) { }

    ngOnInit(): void {
        this.loading = true;
        this.items = null;

        this.dashboard.getActiveOperations()
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
