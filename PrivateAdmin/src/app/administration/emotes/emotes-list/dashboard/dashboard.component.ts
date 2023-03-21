import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { EmotesNavigation } from '../../navigation';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    navigation: INavigation;

    constructor(route: ActivatedRoute) {
        this.navigation = new EmotesNavigation(route);
    }
}
