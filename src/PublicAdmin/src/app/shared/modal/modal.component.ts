import { Component, Input } from '@angular/core';
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

    constructor(public modal: NgbActiveModal) { }
}
