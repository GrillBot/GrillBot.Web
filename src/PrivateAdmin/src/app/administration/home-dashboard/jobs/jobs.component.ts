import { Component, Input } from '@angular/core';
import { Dashboard } from 'src/app/core/models/system';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html'
})
export class JobsComponent {
    @Input() data: Dashboard;
    @Input() loading: boolean;
}
