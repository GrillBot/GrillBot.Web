import { Component, Input } from '@angular/core';
import { Dashboard } from 'src/app/core/models/system';

@Component({
    selector: 'app-active-operations',
    templateUrl: './active-operations.component.html'
})
export class ActiveOperationsComponent {
    @Input() data: Dashboard;
    @Input() loading: boolean;
}
