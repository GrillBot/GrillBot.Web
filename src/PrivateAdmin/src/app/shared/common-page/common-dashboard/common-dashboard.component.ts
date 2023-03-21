import { Component, Input } from '@angular/core';

@Component({
    selector: 'common-dashboard',
    templateUrl: './common-dashboard.component.html'
})
export class CommonDashboardComponent {
    @Input() ignoreFilter = false;
}
