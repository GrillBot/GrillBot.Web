/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import { ApiClientsService } from './../../../core/services/api-clients.service';
import { Component, OnInit } from '@angular/core';
import { ApiClient, ApiClientParams } from 'src/app/core/models/api-clients';
import { List } from 'src/app/core/models/common';
import { ModalService } from 'src/app/shared/modal';
import { ClientEditModalComponent } from '../client-edit-modal/client-edit-modal.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    clients?: List<ApiClient>;

    constructor(
        private modalService: ModalService,
        private service: ApiClientsService
    ) { }

    ngOnInit(): void {
        this.clients = null;
        this.service.getClientsList().subscribe(clients => this.clients = clients);
    }

    deleteClient(client: ApiClient): void {
        const title = 'Smazání klienta';

        this.modalService.showQuestion(title, `Opravdu si přejete smazat klienta ${client.name}?`).onAccept.subscribe(() => {
            this.service.deleteClient(client.id).subscribe(() => {
                this.modalService.showNotification(title, `Klient ${client.name} byl úspěšně smazán.`)
                    .onClose.subscribe(() => this.ngOnInit());
            });
        });
    }

    openEdit(isNew: boolean, client: ApiClient): void {
        if (client === null && isNew) { client = new ApiClient(); }

        const modal = this.modalService.showCustomModal<ClientEditModalComponent>(ClientEditModalComponent, 'xl');
        modal.componentInstance.client = client;
        modal.componentInstance.isNew = isNew;

        modal.onAccept.subscribe(() => {
            const form = modal.componentInstance.form;
            if (!form.dirty) { return; }

            const formData = modal.componentInstance.form.value;
            const params = new ApiClientParams(formData.name as string, formData.allowedMethods as string[]);
            const request = isNew ? this.service.createClient(params) : this.service.updateClient(client.id, params);

            request.subscribe(() => {
                this.modalService.showNotification(
                    modal.componentInstance.modalTitle,
                    'Klient byl úspěšně ' + (isNew ? 'vytvořen' : 'upraven') + '.'
                ).onClose.subscribe(() => this.ngOnInit());
            });
        });
    }
}
