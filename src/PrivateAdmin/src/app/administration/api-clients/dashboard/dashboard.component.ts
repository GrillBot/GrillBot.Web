/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import { ApiClientsService } from './../../../core/services/api-clients.service';
import { Component, OnInit } from '@angular/core';
import { ApiClient } from 'src/app/core/models/api-clients';
import { List } from 'src/app/core/models/common';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    clients?: List<ApiClient>;

    constructor(
        private service: ApiClientsService,
        private modalBox: ModalBoxService
    ) { }

    ngOnInit(): void {
        this.clients = null;
        this.service.getClientsList().subscribe(clients => this.clients = clients);
    }

    deleteClient(client: ApiClient): void {
        const title = 'Smazání klienta';
        const modal = new QuestionModal(title, `Opravdu si přejete smazat klienta ${client.name}?`);
        modal.onAccept.subscribe(() => {
            this.service.deleteClient(client.id).subscribe(() => {
                this.ngOnInit();
                this.modalBox.show(new InfoModal(title, `Klient ${client.name} byl úspěšně smazán.`));
            });
        });

        this.modalBox.show(modal);
    }
}
