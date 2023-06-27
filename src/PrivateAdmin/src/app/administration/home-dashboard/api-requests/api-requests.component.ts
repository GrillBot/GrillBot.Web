import { Component, Input, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { List } from 'src/app/core/models/common';
import { DashboardInfoRow } from 'src/app/core/models/services/services';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'app-api-requests',
    templateUrl: './api-requests.component.html'
})
export class ApiRequestsComponent implements OnInit {
    @Input() apiGroup: string;

    items: List<DashboardInfoRow>;
    loading: boolean;

    constructor(private dashboard: DashboardService) { }

    ngOnInit(): void {
        this.items = null;
        this.loading = true;

        this.dashboard.getApiDashboard(this.apiGroup)
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

    isFailedRequest(statusCode: string): boolean {
        return parseInt(statusCode.substring(0, 3), 10) >= 400;
    }
}
