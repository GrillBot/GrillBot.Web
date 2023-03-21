import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalType } from './modal-data';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent {
    @Input() title: string;
    @Input() text = '';
    @Input() type: ModalType = 'notification';

    @Output() resetFilter = new EventEmitter<unknown>();

    constructor(public modal: NgbActiveModal) { }

    onResetFilter(): void {
        if (this.resetFilter.observed) {
            this.resetFilter.emit();
        }

        this.modal.close(true);
    }
}
