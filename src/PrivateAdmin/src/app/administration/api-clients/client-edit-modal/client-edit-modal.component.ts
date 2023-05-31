/* eslint-disable @typescript-eslint/unbound-method */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ApiClient } from 'src/app/core/models/api-clients';
import { ValidationHelper } from 'src/app/core/lib/validators';

@Component({
    selector: 'app-client-edit-modal',
    templateUrl: './client-edit-modal.component.html'
})
export class ClientEditModalComponent implements OnInit {
    @Input() client: ApiClient;
    @Input() isNew: boolean;

    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    get validationHelper(): typeof ValidationHelper { return ValidationHelper; }

    public get modalTitle(): string {
        return (this.isNew ? 'Vytvoření' : 'Úprava') + ' klienta';
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [this.client.name, Validators.compose([Validators.required, Validators.maxLength(100)])],
            allowedMethods: [this.client.allowedMethods, Validators.required]
        });
    }
}
