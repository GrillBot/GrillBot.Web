import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/core/services/statistics.service';
import { AuditLogStatistics } from 'src/app/core/models/statistics';

@Component({
    selector: 'app-audit-log',
    templateUrl: './audit-log.component.html'
})
export class AuditLogComponent implements OnInit {
    statistics$: Observable<AuditLogStatistics>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getAuditLogStatistics();
    }
}
