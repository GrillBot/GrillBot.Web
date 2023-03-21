import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    constructor(private route: ActivatedRoute) { }

    isActivated(routePart: string): boolean {
        const child = this.route.snapshot.firstChild ?? this.route.snapshot;
        return child.routeConfig.path === routePart;
    }
}
