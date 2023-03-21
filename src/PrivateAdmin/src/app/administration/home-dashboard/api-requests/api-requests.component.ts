import { Component, Input } from '@angular/core';
import { List } from 'src/app/core/models/common';
import { Dashboard, DashboardApiCall } from 'src/app/core/models/system';

@Component({
    selector: 'app-api-requests',
    templateUrl: './api-requests.component.html'
})
export class ApiRequestsComponent {
    @Input() data: Dashboard;
    @Input() isPublic: boolean;
    @Input() loading: boolean;

    get items(): List<DashboardApiCall> {
        return this.isPublic ? this.data.publicApiRequests : this.data.internalApiRequests;
    }

    isFailedRequest(statusCode: string): boolean {
        return parseInt(statusCode.substring(0, 3), 10) >= 400;
    }
}
