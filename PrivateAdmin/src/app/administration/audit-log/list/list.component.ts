/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Support } from 'src/app/core/lib/support';
import { AuditLogFileMetadata, AuditLogListItem, AuditLogListParams } from 'src/app/core/models/audit-log';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { AuditLogItemType } from 'src/app/core/models/enums/audit-log-item-type';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalService } from 'src/app/shared/modal';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<AuditLogListParams> {
    constructor(
        private auditLogService: AuditLogService,
        private modalService: ModalService
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
        this.modalService.showQuestion('Smazání záznamu z logu', 'Opravdu si přeješ smazat záznam z logu? Tato akce je nevratná!')
            .onAccept.subscribe(_ => this.auditLogService.removeItem(id).subscribe(__ => this.list.filterChanged()));
    }

    openDetail(item: AuditLogListItem, raw: boolean): void {
        const modal = this.modalService.showCustomModal<DetailModalComponent>(DetailModalComponent, 'xl');
        modal.componentInstance.item = item;
        modal.componentInstance.rawView = raw;
    }

    downloadFile(id: number, file: AuditLogFileMetadata): void {
        this.auditLogService.downloadFile(id, file);
    }
}
