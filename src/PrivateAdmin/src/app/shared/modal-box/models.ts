import { EventEmitter, InjectionToken, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const DATA_INJECTION_TOKEN = new InjectionToken<any>('modal.data');
export const MODAL_DESC_INJECTION_TOKEN = new InjectionToken<CustomQuestionModal>('modal.description');
export type ModalType = 'notification' | 'component' | 'question' | 'question-component';

export abstract class ModalDescription {
    onModalClose = new EventEmitter<any>();

    output: any;

    constructor(
        public title: string,
        public type: ModalType,
        public message: string,
        public isHtml: boolean = false
    ) { }

    get onClose(): Observable<any> {
        return this.onModalClose.asObservable();
    }

    get isCustom(): boolean {
        return this.type === 'component' || this.type === 'question-component';
    }

    get isQuestion(): boolean {
        return this.type === 'question' || this.type === 'question-component';
    }
}

export class InfoModal extends ModalDescription {
    constructor(
        public title: string,
        public message: string,
        public isHtml: boolean = false
    ) { super(title, 'notification', message, isHtml); }
}

export class QuestionModal extends ModalDescription {
    constructor(
        public title: string,
        public message: string,
        public isHtml: boolean = false,

        public acceptText = 'Ano',
        public declineText = 'Ne'
    ) { super(title, 'question', message, isHtml); }

    get onAccept(): Observable<any> {
        return this.onClose.pipe(filter((value: any) => typeof value === 'boolean' && value));
    }

    get onDecline(): Observable<any> {
        return this.onClose.pipe(filter((value: any) => value === null || (typeof value === 'boolean' && value)));
    }
}

export class CustomComponentModal extends InfoModal {
    constructor(
        public title: string,
        public component: any,
        public buttons?: TemplateRef<any>,
        public componentData?: any
    ) {
        super(title, null, false);
        this.type = 'component';
    }
}

export class CustomQuestionModal extends QuestionModal {
    constructor(
        public title: string,
        public component: any,
        public buttons?: TemplateRef<any>,
        public componentData?: any,

        public acceptText = 'Ano',
        public declineText = 'Ne'
    ) {
        super(title, null, false, acceptText, declineText);
        this.type = 'question-component';
    }
}
