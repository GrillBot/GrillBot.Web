import { SystemService } from 'src/app/core/services/system.service';
import { ConnectionStateColors, ConnectionStateTexts } from './../../../core/models/enums/connection-state';
import { Component, OnInit } from '@angular/core';
import { ConnectionState } from 'src/app/core/models/enums/connection-state';
import { Support } from 'src/app/core/lib/support';
import { List } from 'src/app/core/models/common';
import * as models from 'src/app/core/models/system';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
    selector: 'app-common-info',
    templateUrl: './common-info.component.html'
})
export class CommonInfoComponent implements OnInit {
    dashboardInfo: models.DashboardInfo;
    services: List<models.DashboardService>;

    dashboardInfoLoading: boolean;
    dashboardServicesLoading: boolean;

    constructor(
        private system: SystemService,
        private dashboard: DashboardService
    ) { }

    get connectionColor(): string {
        return ConnectionStateColors[Support.getEnumKeyByValue(ConnectionState, this.dashboardInfo.connectionState)] as string;
    }

    get connectionText(): string {
        return ConnectionStateTexts[Support.getEnumKeyByValue(ConnectionState, this.dashboardInfo.connectionState)] as string;
    }

    ngOnInit(): void {
        this.dashboardInfoLoading = true;
        this.dashboardServicesLoading = true;
        this.services = null;
        this.dashboardInfo = null;

        this.dashboard.getCommonInfo().subscribe(info => {
            this.dashboardInfo = info;
            this.dashboardInfoLoading = false;
        });

        this.dashboard.getServicesList().subscribe(services => {
            this.services = services;
            this.dashboardServicesLoading = false;
        });
    }

    toggleState(active: boolean): void {
        this.system.setBotState(active).subscribe(() => this.dashboardInfo.isActive = active);
    }
}
