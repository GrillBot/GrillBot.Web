import { Dictionary } from 'src/app/core/models/common';
import { Component, Inject } from '@angular/core';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-refresh-cache-modal',
    templateUrl: './refresh-cache-modal.component.html'
})
export class RefreshCacheModalComponent {
    report: Dictionary<string, number>;

    constructor(@Inject(DATA_INJECTION_TOKEN) injectedData: Dictionary<string, number>) {
        this.report = injectedData;
    }
}
