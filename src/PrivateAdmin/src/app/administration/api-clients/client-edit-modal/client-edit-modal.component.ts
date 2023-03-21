/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument,  */
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/unbound-method */
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientsService } from 'src/app/core/services/api-clients.service';
import { ModalService } from 'src/app/shared/modal';
import { ApiClient, ApiClientParams } from 'src/app/core/models/api-clients';
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
        private modalService: ModalService,
        private service: ApiClientsService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router
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

    submitForm(): void {
        const title = (this.isNew ? 'Vytvoření' : 'Úprava') + ' klienta';
        const message = 'Opravdu si přejete ' + (this.isNew ? 'vytvořit' : 'upravit') + ' tohoto klienta?';
        const successMessage = 'Klient byl úspěšně ' + (this.isNew ? 'vytvořen' : 'upraven');

        this.modalService.showQuestion(title, message).onAccept.subscribe(() => {
            const form = this.form.value;
            const parameters = new ApiClientParams(form.name, form.allowedMethods);
            const request = this.isNew ? this.service.createClient(parameters) : this.service.updateClient(this.client.id, parameters);

            request.subscribe(() => {
                this.modalService.showNotification(title, successMessage).onClose.subscribe(() => {
                    this.router.navigateByUrl('/admin/api-clients');
                });
            });
        });
    }
}
