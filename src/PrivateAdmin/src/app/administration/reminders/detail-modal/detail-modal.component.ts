import { Component, Inject } from '@angular/core';
import { RemindMessage } from 'src/app/core/models/reminder';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html'
})
export class DetailModalComponent {
    item: RemindMessage;

    constructor(@Inject(DATA_INJECTION_TOKEN) injectedData: RemindMessage) {
        this.item = injectedData;
    }
}
