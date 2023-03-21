import { SearchingListItem } from './../../../core/models/searching';
import { Component } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetSearchingListParams } from 'src/app/core/models/searching';
import { SearchingService } from 'src/app/core/services/searching.service';
import { ModalService } from 'src/app/shared/modal';
import { SearchingDetailComponent } from '../searching-detail/searching-detail.component';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetSearchingListParams> {
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

    showMessage(item: SearchingListItem, event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const modal = this.modalService.showCustomModal<SearchingDetailComponent>(SearchingDetailComponent, 'xl');
        modal.componentInstance.item = item;
    }
}
