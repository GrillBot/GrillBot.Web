import { AuditLogItemType } from './../../../core/models/enums/audit-log-item-type';
import { Component, Inject, OnInit } from '@angular/core';
import { AuditLogListItem } from 'src/app/core/models/audit-log';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
    item: AuditLogListItem;
    data: any;

    constructor(@Inject(DATA_INJECTION_TOKEN) injectedData: AuditLogListItem) {
        this.item = injectedData;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    get AuditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }

    get isDiff(): boolean {
        return [
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.MemberRoleUpdated,
            AuditLogItemType.GuildUpdated,
            AuditLogItemType.ThreadUpdated
        ].includes(this.item.type);
    }

    ngOnInit(): void {
        this.data = this.item.data;
    }
}
