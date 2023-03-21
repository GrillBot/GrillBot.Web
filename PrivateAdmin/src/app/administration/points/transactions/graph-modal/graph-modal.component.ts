import { Dictionary } from '../../../../core/models/common';
import { Component, Input, OnInit } from '@angular/core';
import { GetPointTransactionsParams } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';

@Component({
    selector: 'app-graph-modal',
    templateUrl: './graph-modal.component.html'
})
export class GraphModalComponent implements OnInit {
    @Input() filter: GetPointTransactionsParams;
    @Input() isMerged: boolean;

    messagePoints: Dictionary<string, number> = [];
    reactionPoints: Dictionary<string, number> = [];
    totalPoints: Dictionary<string, number> = [];

    constructor(
        private service: PointsService
    ) { }

    ngOnInit(): void {
        this.filter.merged = this.isMerged;

        this.service.getGraphData(this.filter).subscribe(data => {
            for (const item of data) {
                this.messagePoints.push({ key: item.day.toLocaleString(true), value: item.messagePoints });
                this.reactionPoints.push({ key: item.day.toLocaleString(true), value: item.reactionPoints });
                this.totalPoints.push({ key: item.day.toLocaleString(true), value: item.totalPoints });
            }
        });
    }

}
