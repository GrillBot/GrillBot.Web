import { ModalData } from './modal-data';
import { ModalComponent } from './modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

export type ModalSize = 'sm' | 'lg' | 'xl' | 'xxl';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
@Injectable({ providedIn: 'root' })
export class ModalService {
    constructor(
        private modal: NgbModal
    ) { }

    showQuestion(title: string, content: string, size: ModalSize = 'lg'): ModalData<ModalComponent> {
        const modal = this.modal.open(ModalComponent, { size });

        modal.componentInstance.title = title;
        modal.componentInstance.text = content;
        modal.componentInstance.type = 'question';

        return new ModalData(modal);
    }

    showNotification(title: string, content: string, size: ModalSize = 'lg'): ModalData<ModalComponent> {
        const modal = this.modal.open(ModalComponent, { size });

        modal.componentInstance.title = title;
        modal.componentInstance.text = content;
        modal.componentInstance.type = 'notification';

        return new ModalData(modal);
    }

    showCustomModal<TComponent>(type: any, size: ModalSize = 'lg'): ModalData<TComponent> {
        return new ModalData<TComponent>(this.modal.open(type, { size }));
    }
}
