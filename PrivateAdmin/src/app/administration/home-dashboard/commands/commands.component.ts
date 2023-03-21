import { Component, Input } from '@angular/core';
import { Dashboard } from 'src/app/core/models/system';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html'
})
export class CommandsComponent {
    @Input() data: Dashboard;
    @Input() loading: boolean;
}
