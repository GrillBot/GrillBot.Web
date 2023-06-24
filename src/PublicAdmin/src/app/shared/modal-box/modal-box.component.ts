import { Component, HostListener, OnInit, TemplateRef, ViewChild, Injector } from '@angular/core';
import { ModalBoxService } from './modal-box.service';
import { CustomComponentModal, CustomQuestionModal, DATA_INJECTION_TOKEN, ModalDescription, QuestionModal } from './models';

@Component({
    selector: 'app-modal-box',
    templateUrl: './modal-box.component.html',
    styleUrls: ['./modal-box.component.scss']
})
export class ModalBoxComponent implements OnInit {
    @ViewChild('messageTemplate') messageTemplate: TemplateRef<any>;

    description: ModalDescription | null;
    visible = false;
    customComponent: any | null;
    customComponentInjector: Injector | null;

    constructor(
        private modalBoxService: ModalBoxService,
        private rootInjector: Injector
    ) { }

    get customButtons(): TemplateRef<any> | null {
        return this.description.isCustom ? (this.description as CustomComponentModal).buttons : null;
    }

    get acceptText(): string {
        return this.description.isQuestion ? (this.description as QuestionModal).acceptText : '';
    }

    get declineText(): string {
        return this.description.isQuestion ? (this.description as QuestionModal).declineText : '';
    }

    get messageTemplateContext(): any {
        if (this.description.isCustom) {
            return {};
        }

        return {
            message: this.description.message,
            isHtml: this.description.isHtml
        };
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeyDownNegative(_: any): void {
        this.action(null);
    }

    @HostListener('document:keydown.control.enter', ['$event'])
    onKeyDownPositive(_: any): void {
        this.action(true);
    }

    ngOnInit(): void {
        this.modalBoxService.register = description => this.render(description);
    }

    render(description: ModalDescription): void {
        this.description = description;

        if (description.isCustom) {
            this.customComponent = this.createCustomComponent();
            this.customComponentInjector = this.createCustomComponentInjector();
        }

        this.visible = true;
    }

    action(value: any): void {
        this.visible = false;

        if (this.description) {
            this.description.onModalClose.emit(value);
            this.description = null;
        }
    }

    private createCustomComponent(): any {
        if (this.description.type === 'component') {
            return (this.description as CustomComponentModal).component;
        }

        if (this.description.type === 'question-component') {
            return (this.description as CustomQuestionModal).component;
        }

        return null;
    }

    private createCustomComponentInjector(): Injector {
        let data: any = null;

        if (this.description.type === 'component') {
            data = (this.description as CustomComponentModal).componentData;
        }

        if (this.description.type === 'question-component') {
            data = (this.description as CustomQuestionModal).component;
        }

        return data === null ? null : Injector.create({
            parent: this.rootInjector,
            providers: [{ provide: DATA_INJECTION_TOKEN, useValue: data }]
        });
    }
}
