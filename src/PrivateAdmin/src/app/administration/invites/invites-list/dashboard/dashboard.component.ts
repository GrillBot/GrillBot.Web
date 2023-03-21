import { ActivatedRoute } from '@angular/router';
import { INavigation } from './../../../../shared/navigation/navigation';
import { InviteNavigation } from './../../navigation';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    navigation: INavigation;

    constructor(route: ActivatedRoute) {
        this.navigation = new InviteNavigation(route);
    }
}
