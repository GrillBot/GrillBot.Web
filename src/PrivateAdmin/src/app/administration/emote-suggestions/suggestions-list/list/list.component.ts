import { SuggestionDetailModalComponent } from './../../suggestion-detail-modal/suggestion-detail-modal.component';
import { EmoteSuggestion, GetSuggestionListParams } from './../../../../core/models/suggestions';
import { Component } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { EmoteSuggestionService } from 'src/app/core/services/emote-suggestion.service';
import { ModalService } from 'src/app/shared/modal';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetSuggestionListParams> {
    constructor(
        private suggestionService: EmoteSuggestionService,
        private modalService: ModalService
    ) { super(); }

    configure(): void {
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.suggestionService.getSuggestionList(this.filter);
    }

    showDetail(suggestion: EmoteSuggestion): void {
        const modal = this.modalService.showCustomModal<SuggestionDetailModalComponent>(SuggestionDetailModalComponent);
        modal.componentInstance.suggestion = suggestion;
    }
}
