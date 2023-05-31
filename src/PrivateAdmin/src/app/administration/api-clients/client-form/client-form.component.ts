/* eslint-disable @typescript-eslint/unbound-method */
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClient, ApiClientParams } from 'src/app/core/models/api-clients';
import { ApiClientsService } from 'src/app/core/services/api-clients.service';
import { EMPTY, throwError } from 'rxjs';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoModal } from 'src/app/shared/modal-box/models';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnInit {
    apiClient: ApiClient;
    form: FormGroup;
    isNew = false;

    constructor(
        private route: ActivatedRoute,
        private apiClientsService: ApiClientsService,
        private router: Router,
        private fb: FormBuilder,
        private modalBox: ModalBoxService
    ) { }

    get validationHelper(): typeof ValidationHelper { return ValidationHelper; }

    ngOnInit(): void {
        const clientId = this.route.snapshot.params.id as string;

        this.form = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
            allowedMethods: [[], Validators.required]
        });

        if (clientId === 'add') {
            this.apiClient = new ApiClient();
            this.isNew = true;
        } else {
            this.apiClientsService.getClient(clientId).pipe(catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.router.navigate(['/admin/api-clients']);
                    return EMPTY;
                }

                return throwError(() => err);
            })).subscribe(client => {
                this.apiClient = client;

                this.form.patchValue({
                    name: client.name,
                    allowedMethods: client.allowedMethods
                });
            });
        }
    }

    process(): void {
        if (!this.form.dirty) { return; }

        const parameters = new ApiClientParams(this.form.value.name, this.form.value.allowedMethods);
        const request = this.isNew ?
            this.apiClientsService.createClient(parameters) :
            this.apiClientsService.updateClient(this.apiClient.id, parameters);

        request.subscribe(() => {
            const message = 'Klient byl úspěšně ' + (this.isNew ? 'vytvořen' : 'upraven');
            const infoModal = new InfoModal((this.isNew ? 'Vytvoření' : 'Úprava') + ' klienta', message);
            infoModal.onClose.subscribe(() => {
                this.router.navigate(['/admin/api-clients']);
            });

            this.modalBox.show(infoModal);
        });
    }

}
