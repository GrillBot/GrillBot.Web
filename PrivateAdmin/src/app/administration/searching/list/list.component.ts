import { SearchingListItem } from './../../../core/models/searching';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetSearchingListParams } from 'src/app/core/models/searching';
import { SearchingService } from 'src/app/core/services/searching.service';
import { ModalService } from 'src/app/shared/modal';
import { CheckboxComponent } from 'src/app/shared/checkbox/checkbox.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { SearchingDetailComponent } from '../searching-detail/searching-detail.component';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetSearchingListParams> {
    @ViewChildren('item_check') checkboxes: QueryList<CheckboxComponent>;
    @ViewChild('card', { static: false }) card: CardComponent;

    constructor(
        private searchingService: SearchingService,
        private modalService: ModalService
    ) { super(); }

    configure(): void {
        this.sort.orderBy = 'Id';
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.searchingService.getSearchList(this.filter);
    }

    removeItems(): void {
        const selectedItems = this.checkboxes.filter(o => o.checked).map(o => parseInt(o.id, 10));
        if (selectedItems.length === 0) { return; }

        this.modalService.showQuestion('Smazat hledání', 'Opravdu si přejete smazat označená hledání?').onAccept.subscribe(_ => {
            this.searchingService.removeSearches(selectedItems).subscribe(__ => this.list.filterChanged());
        });
    }

    showMessage(item: SearchingListItem, event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const modal = this.modalService.showCustomModal<SearchingDetailComponent>(SearchingDetailComponent, 'xl');
        modal.componentInstance.item = item;
    }
}
