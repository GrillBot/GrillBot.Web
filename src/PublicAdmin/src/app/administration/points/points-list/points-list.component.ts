import { Component, OnInit } from '@angular/core';
import { ObservableList } from 'src/app/core/models/common';
import { UserPointsItem } from 'src/app/core/models/users';
import { PointsService } from 'src/app/core/services/points.service';

@Component({
    selector: 'app-points-list',
    templateUrl: './points-list.component.html'
})
export class PointsListComponent implements OnInit {
    points: ObservableList<UserPointsItem>;

    constructor(
        private pointsService: PointsService
    ) { }

    ngOnInit(): void {
        this.points = this.pointsService.getPointsLeaderboard();
    }

}
