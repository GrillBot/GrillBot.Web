import { SuggestionDetailModalComponent } from './../../suggestion-detail-modal/suggestion-detail-modal.component';
import { EmoteSuggestion, GetSuggestionListParams } from './../../../../core/models/suggestions';
import { Component } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { EmoteSuggestionService } from 'src/app/core/services/emote-suggestion.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { CustomComponentModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetSuggestionListParams> {
    constructor(
        private suggestionService: EmoteSuggestionService,
        private modalBox: ModalBoxService
    ) { super(); }

    configure(): void {
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.suggestionService.getSuggestionList(this.filter);
    }

    showDetail(suggestion: EmoteSuggestion): void {
        this.modalBox.show(new CustomComponentModal(`Detail záznamu #${suggestion.id}`, SuggestionDetailModalComponent, null, suggestion));
    }
}
