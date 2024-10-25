import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { PointsNavigation } from '../../navigation';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html'
})
export class ChartsComponent {
    navigation: INavigation;

    constructor(route: ActivatedRoute) {
        this.navigation = new PointsNavigation(route);
    }
}
