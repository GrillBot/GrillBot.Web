import { Dictionary } from 'src/app/core/models/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-refresh-cache-modal',
    templateUrl: './refresh-cache-modal.component.html'
})
export class RefreshCacheModalComponent {
    report: Dictionary<string, number>;
}
