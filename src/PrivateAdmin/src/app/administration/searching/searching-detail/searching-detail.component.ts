import { Component, Input } from '@angular/core';
import { SearchingListItem } from 'src/app/core/models/searching';

@Component({
    selector: 'app-searching-detail',
    templateUrl: './searching-detail.component.html'
})
export class SearchingDetailComponent {
    @Input() item: SearchingListItem;
}
