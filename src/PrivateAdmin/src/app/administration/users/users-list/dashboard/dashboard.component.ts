import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    constructor(router: Router) {
        router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
}
