import { PaginatedParams, Dictionary, PaginatedResponse } from './../../../core/models/common';
import { Component } from '@angular/core';
import { UnverifyLogItem, UnverifyLogParams } from 'src/app/core/models/unverify';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { ModalService } from 'src/app/shared/modal';
import { DataService } from 'src/app/core/services/data.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<UnverifyLogParams> {
    channels: Dictionary<string, string>;

    constructor(
        private unverifyService: UnverifyService,
        private modalService: ModalService,
        private dataService: DataService
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
        this.modalService
            .showQuestion('Obnovení stavu uživatele', 'Opravdu si přejete obnovit tomuto uživateli stav přístupů před unverify?')
            .onAccept.subscribe(_ => this.unverifyService.recoverUnverifyState(item.id).subscribe(__ => this.reload()));
    }

    resolveChannelName(id: string): string | null {
        if (!this.channels) { return ''; }
        return this.channels.find(o => o.key === id)?.value ?? '';
    }
}
