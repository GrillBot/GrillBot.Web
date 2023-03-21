import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OperationStatItem, OperationStats } from 'src/app/core/models/statistics';
import { StatisticsService } from 'src/app/core/services/statistics.service';

@Component({
    selector: 'app-operations',
    templateUrl: './operations.component.html'
})
export class OperationsComponent implements OnInit {
    statistics$: Observable<OperationStats>;

    constructor(private service: StatisticsService) { }

    ngOnInit(): void {
        this.statistics$ = this.service.getOperationStatistics();
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
