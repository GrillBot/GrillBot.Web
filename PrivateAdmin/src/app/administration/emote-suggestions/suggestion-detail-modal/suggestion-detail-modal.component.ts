import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { EmoteSuggestion } from 'src/app/core/models/suggestions';

@Component({
    selector: 'app-suggestion-detail-modal',
    templateUrl: './suggestion-detail-modal.component.html',
    styleUrls: ['./suggestion-detail-modal.component.scss']
})
export class SuggestionDetailModalComponent {
    @Input() suggestion: EmoteSuggestion;

    constructor(public modal: NgbActiveModal) { }
}
