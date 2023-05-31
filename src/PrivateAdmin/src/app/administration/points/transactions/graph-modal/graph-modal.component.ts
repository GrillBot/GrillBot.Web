import { Dictionary } from '../../../../core/models/common';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { AdminListRequest } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-graph-modal',
    templateUrl: './graph-modal.component.html'
})
export class GraphModalComponent implements OnInit {
    @Input() filter: AdminListRequest;

    messagePoints: Dictionary<string, number> = [];
    reactionPoints: Dictionary<string, number> = [];
    totalPoints: Dictionary<string, number> = [];

    constructor(
        private service: PointsService,
        @Inject(DATA_INJECTION_TOKEN) injectedData: AdminListRequest
    ) {
        this.filter = injectedData;
    }

    ngOnInit(): void {
        this.service.getGraphData(this.filter).subscribe(data => {
            for (const item of data) {
                this.messagePoints.push({ key: item.day.toLocaleString(true), value: item.messagePoints });
                this.reactionPoints.push({ key: item.day.toLocaleString(true), value: item.reactionPoints });
                this.totalPoints.push({ key: item.day.toLocaleString(true), value: item.totalPoints });
            }
        });
    }

}
