import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-validation-errors-modal',
    templateUrl: './validation-errors-modal.component.html'
})
export class ValidationErrorsModalComponent {
    @Input() errors: string[] = [];

    get errorList(): string[] {
        return [...new Set(this.errors)];
    }
}
