import { PaginatedParams, Dictionary, PaginatedResponse } from './../../../core/models/common';
import { Component } from '@angular/core';
import { UnverifyLogItem, UnverifyLogParams } from 'src/app/core/models/unverify';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataService } from 'src/app/core/services/data.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<UnverifyLogParams> {
    channels: Dictionary<string, string>;

    constructor(
        private unverifyService: UnverifyService,
        private dataService: DataService,
        private modalBox: ModalBoxService
    ) { super(); }

    configure(): void {
        this.sort.orderBy = 'CreatedAt';
        this.sort.descending = true;

        this.dataService.getChannels().subscribe(channels => this.channels = channels);
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.unverifyService.getUnverifyLog(this.filter);
    }

    recoverState(item: UnverifyLogItem): void {
        const title = 'Obnovení stavu uživatele';
        const modal = new QuestionModal(title, 'Opravdu si přejete obnovit tomuto uživateli stav přístupů před unverify?');

        modal.onAccept.subscribe(() => {
            this.unverifyService.recoverUnverifyState(item.id).subscribe(__ => {
                this.modalBox.show(new InfoModal(title, 'Obnovení stavu bylo dokončeno.'));
                this.reload();
            });
        });

        this.modalBox.show(modal);
    }

    resolveChannelName(id: string): string | null {
        return !this.channels ? '' : this.channels.find(o => o.key === id)?.value ?? '';
    }
}
