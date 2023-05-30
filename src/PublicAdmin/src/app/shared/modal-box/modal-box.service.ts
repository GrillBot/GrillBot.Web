import { Injectable } from '@angular/core';
import { ModalDescription } from './models';

@Injectable({ providedIn: 'root' })
export class ModalBoxService {
    register?: (description: ModalDescription) => void;

    show(modal: ModalDescription): void {
        if (!this.register) {
            throw new Error('Not implemented');
        }

        this.register(modal);
    }
}
