import { Component, Inject } from '@angular/core';
import { SearchingListItem } from 'src/app/core/models/searching';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-searching-detail',
    templateUrl: './searching-detail.component.html'
})
export class SearchingDetailComponent {
    item: SearchingListItem;

    constructor(@Inject(DATA_INJECTION_TOKEN) injectedData: SearchingListItem) {
        this.item = injectedData;
    }
}
