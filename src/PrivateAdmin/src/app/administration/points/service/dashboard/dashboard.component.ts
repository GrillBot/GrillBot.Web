import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { PointsNavigation } from '../../navigation';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    navigation: INavigation;

    constructor(route: ActivatedRoute) {
        this.navigation = new PointsNavigation(route);
    }
}
