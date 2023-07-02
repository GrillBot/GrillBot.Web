import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ServiceInfo } from 'src/app/core/models/services/services';
import { OperationStatItem } from 'src/app/core/models/statistics';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.component.html',
    styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {
    request$: Observable<ServiceInfo>;
    statusInfoRequest$: Observable<any> | null;
    id: string;

    constructor(
        private route: ActivatedRoute,
        private service: ServiceService
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id as string;
        this.request$ = this.service.getServiceInfo(this.id);

        switch (this.id) {
            case 'audit-log':
                this.statusInfoRequest$ = this.service.getAuditLogStatusInfo();
                break;
            case 'points':
                this.statusInfoRequest$ = this.service.getPointsServiceStatusInfo();
                break;
        }
    }

    readStatistics(stats: OperationStatItem[], level: number = 0): { level: number; item: OperationStatItem }[] {
        const result: { level: number; item: OperationStatItem }[] = [];

        for (const item of stats) {
            result.push({ level, item });

            if (item.childItems.length > 0) {
                result.push(...this.readStatistics(item.childItems, level + 1));
            }
        }

        return result;
    }
}
