import { SystemService } from 'src/app/core/services/system.service';
import { ConnectionStateColors, ConnectionStateTexts } from './../../../core/models/enums/connection-state';
import { Dashboard } from './../../../core/models/system';
import { Component, Input } from '@angular/core';
import { ConnectionState } from 'src/app/core/models/enums/connection-state';
import { Support } from 'src/app/core/lib/support';

@Component({
    selector: 'app-common-info',
    templateUrl: './common-info.component.html'
})
export class CommonInfoComponent {
    @Input() data: Dashboard;
    @Input() loading: boolean;

    constructor(private system: SystemService) { }

    get connectionColor(): string {
        return ConnectionStateColors[Support.getEnumKeyByValue(ConnectionState, this.data.connectionState)] as string;
    }

    get connectionText(): string {
        return ConnectionStateTexts[Support.getEnumKeyByValue(ConnectionState, this.data.connectionState)] as string;
    }

    toggleState(active: boolean): void {
        this.system.setBotState(active).subscribe(() => this.data.isActive = active);
    }
}
