import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dictionary } from 'src/app/core/models/common';
import { AdminListRequest } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { PointsNavigation } from '../../navigation';

interface Chart {
    message: Dictionary<string, number>;
    reaction: Dictionary<string, number>;
    total: Dictionary<string, number>;
    loaded: boolean;
}

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {
    navigation: INavigation;

    nonMerged: Chart;
    merged: Chart;

    constructor(
        route: ActivatedRoute,
        private pointsService: PointsService
    ) {
        this.navigation = new PointsNavigation(route);
    }

    ngOnInit(): void {
        this.nonMerged = {
            message: [],
            reaction: [],
            total: [],
            loaded: false
        };

        this.merged = {
            message: [],
            reaction: [],
            total: [],
            loaded: false
        };

        this.initData(false, this.nonMerged);
        this.initData(true, this.merged);
    }

    private createFilter(merged: boolean): AdminListRequest {
        const filter = new AdminListRequest();
        filter.showMerged = merged;

        return filter;
    }

    private initData(merged: boolean, target: Chart): void {
        const filter = this.createFilter(merged);

        this.pointsService.getGraphData(filter).subscribe(data => {
            for (const item of data) {
                target.message.push({ key: item.day.toLocaleString(true), value: item.messagePoints });
                target.reaction.push({ key: item.day.toLocaleString(true), value: item.reactionPoints });
                target.total.push({ key: item.day.toLocaleString(true), value: item.totalPoints });
            }

            target.loaded = true;
        });
    }

}
