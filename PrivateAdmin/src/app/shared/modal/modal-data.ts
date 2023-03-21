import { filter } from 'rxjs/operators';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
export class ModalData<TComponent> {
    constructor(public modal: NgbModalRef) { }

    get onClose(): Observable<any> { return this.modal.closed; }
    get onAccept(): Observable<any> { return this.onClose.pipe(filter(o => o)); }
    get onDecline(): Observable<any> { return this.onClose.pipe(filter(o => o === false)); }

    get componentInstance(): TComponent {
        return this.modal.componentInstance as TComponent;
    }
}

export type ModalType = 'notification' | 'question' | 'form' | 'filter';
