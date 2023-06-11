/* eslint-disable @typescript-eslint/naming-convention */
import { AuditLogItemType } from './../../../core/models/enums/audit-log-item-type';
import { Component, Inject } from '@angular/core';
import { DATA_INJECTION_TOKEN } from 'src/app/shared/modal-box/models';
import { LogListItem } from 'src/app/core/models/audit-log';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent {
    item: LogListItem;
    data: any;

    constructor(@Inject(DATA_INJECTION_TOKEN) injectedData: any) {
        this.item = injectedData.item;
        this.data = injectedData.detail?.data;
    }

    get isText(): boolean {
        return [AuditLogItemType.Info, AuditLogItemType.Warning, AuditLogItemType.Error].includes(this.item.type);
    }

    get AuditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }
    get Object(): typeof Object { return Object; }

    get isDiff(): boolean {
        return [
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.GuildUpdated,
            AuditLogItemType.ThreadUpdated
        ].includes(this.item.type);
    }
}
