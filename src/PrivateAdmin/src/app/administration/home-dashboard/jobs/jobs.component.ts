import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/core/models/common';
import { DashboardInfoRow } from 'src/app/core/models/services/services';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {
    items: List<DashboardInfoRow>;
    loading: boolean;

    constructor(private dashboard: DashboardService) { }

    ngOnInit(): void {
        this.items = null;
        this.loading = true;

        this.dashboard.getJobsDashboard().subscribe(items => {
            this.items = items;
            this.loading = false;
        });
    }
}
