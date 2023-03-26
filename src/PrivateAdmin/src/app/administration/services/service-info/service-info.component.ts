import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/core/services/system.service';
import { ServiceInfo } from 'src/app/core/models/services/services';
import { OperationStatItem } from 'src/app/core/models/statistics';

@Component({
    selector: 'app-service-info',
    templateUrl: './service-info.component.html',
    styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {
    request$: Observable<ServiceInfo>;

    constructor(
        private service: SystemService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params.id as string;
        this.request$ = this.service.getServiceInfo(id);
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
