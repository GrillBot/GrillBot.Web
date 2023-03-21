import { Component, Input } from '@angular/core';
import { Dashboard } from 'src/app/core/models/system';

@Component({
    selector: 'app-today-avg-times',
    templateUrl: './today-avg-times.component.html'
})
export class TodayAvgTimesComponent {
    @Input() data: Dashboard;
    @Input() loading: boolean;

    translateKey(key: string): string {
        switch (key) {
            case 'InternalApi': return 'Privátní API';
            case 'PublicApi': return 'Veřejné API';
            case 'Jobs': return 'Naplánované úlohy';
            case 'Commands': return 'Příkazy';
            default: return key;
        }
    }
}
