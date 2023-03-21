import { Dashboard } from './../../../core/models/system';
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    data: Dashboard;
    loading = true;

    constructor(
        private system: SystemService
    ) { }

    ngOnInit(): void {
        this.data = null;
        this.loading = true;

        this.system.getDashboard().subscribe(data => {
            this.data = data;
            this.loading = false;
        });
    }

}
