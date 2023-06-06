/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Support } from 'src/app/core/lib/support';
import { AuditLogListItem, AuditLogListParams } from 'src/app/core/models/audit-log';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { AuditLogItemType } from 'src/app/core/models/enums/audit-log-item-type';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { CustomComponentModal, InfoModal, QuestionModal } from 'src/app/shared/modal-box/models';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<AuditLogListParams> {
    constructor(
        private auditLogService: AuditLogService,
        private modalBox: ModalBoxService
    ) { super(); }

    get AuditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }
    get Support(): typeof Support { return Support; }

    configure(): void {
        this.sort.orderBy = 'CreatedAt';
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.auditLogService.getAuditLogList(this.filter);
    }

    removeItem(id: number): void {
        const modal = new QuestionModal('Smazání záznamu z logu',
            'Opravdu si přeješ smazat záznam z logu? <b>Tato akce je nevratná!</b>', true);
        modal.onAccept.subscribe(() => this.auditLogService.removeItem(id).subscribe(__ => this.list.filterChanged()));

        this.modalBox.show(modal);
    }

    openDetail(item: AuditLogListItem, raw: boolean): void {
        if (raw) {
            const content: string = item.isText ? item.data : JSON.stringify(item.data, undefined, 2);
            this.modalBox.show(new InfoModal('Data záznamu', `<pre class="mb-0">${content}</pre>`, true));
        } else {
            this.modalBox.show(new CustomComponentModal('Detail záznamu', DetailModalComponent, null, item));
        }
    }
}
