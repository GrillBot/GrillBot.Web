import { Component, Input } from '@angular/core';
import { Dashboard } from 'src/app/core/models/system';

@Component({
    selector: 'app-operation-stats',
    templateUrl: './operation-stats.component.html'
})
export class OperationStatsComponent {
    @Input() data: Dashboard;
    @Input() loading: boolean;
}
