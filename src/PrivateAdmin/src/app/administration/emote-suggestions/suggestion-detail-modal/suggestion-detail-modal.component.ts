import { Component, Inject } from '@angular/core';
import { EmoteSuggestion } from 'src/app/core/models/suggestions';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-suggestion-detail-modal',
    templateUrl: './suggestion-detail-modal.component.html',
    styleUrls: ['./suggestion-detail-modal.component.scss']
})
export class SuggestionDetailModalComponent {
    suggestion: EmoteSuggestion;

    constructor(@Inject(DATA_INJECTION_TOKEN) injectedData: EmoteSuggestion) {
        this.suggestion = injectedData;
    }
}
