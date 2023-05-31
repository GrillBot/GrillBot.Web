/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dictionary } from 'src/app/core/models/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuditLogListParams } from 'src/app/core/models/audit-log';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuditLogItemType, AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Support } from 'src/app/core/lib/support';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { ExtendedFilterData } from './extended-filters/models';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends FilterComponentBase<AuditLogListParams> {
    types: Dictionary<number, string>;
    exFilters: ExtendedFilterData;

    constructor(
        fb: UntypedFormBuilder,
        storage: StorageService,
    ) { super(fb, storage); }

    get guildId(): string { return this.form.get('guildId').value as string; }
    get selectedTypes(): AuditLogItemType[] { return this.form.get('types').value as AuditLogItemType[]; }
    get excludedTypes(): AuditLogItemType[] { return this.form.get('excludedTypes').value as AuditLogItemType[]; }
    get auditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }

    get allowExtendedFilters(): boolean {
        const typesWithFilters = [
            AuditLogItemType.Info,
            AuditLogItemType.Warning,
            AuditLogItemType.Error,
            AuditLogItemType.InteractionCommand,
            AuditLogItemType.JobCompleted,
            AuditLogItemType.API,
            AuditLogItemType.OverwriteCreated,
            AuditLogItemType.OverwriteDeleted,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberRoleUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.MessageDeleted
        ];

        let selTypes = this.selectedTypes;
        if (!selTypes) { selTypes = []; }

        let exclTypes = this.excludedTypes;
        if (!exclTypes) { exclTypes = []; }

        const selected = [...selTypes].filter(o => !exclTypes.includes(o));
        return typesWithFilters.some(o => selected.includes(o));
    }

    configure(): void {
        this.filterId = 'AuditLogList';

        this.types = Object.keys(AuditLogItemType)
            .filter(o => !isNaN(parseInt(o, 10)) && parseInt(o, 10) > 0)
            .map(o => ({
                key: parseInt(o, 10),
                value: AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, parseInt(o, 10))] as string
            }));
    }

    deserializeData(data: any): AuditLogListParams {
        return AuditLogListParams.create(data);
    }

    createData(empty: boolean): AuditLogListParams {
        if (empty) {
            this.exFilters = null;
            return AuditLogListParams.empty;
        } else {
            const filter = AuditLogListParams.create(this.form.value);

            if (this.exFilters) {
                filter.infoFilter = this.exFilters.info;
                filter.warningFilter = this.exFilters.warning;
                filter.errorFilter = this.exFilters.error;
                filter.interactionFilter = this.exFilters.interaction;
                filter.jobFilter = this.exFilters.job;
                filter.apiRequestFilter = this.exFilters.api;
                filter.overwriteCreatedFilter = this.exFilters.overwriteCreated;
                filter.overwriteDeletedFilter = this.exFilters.overwriteCreated;
                filter.overwriteUpdatedFilter = this.exFilters.overwriteUpdated;
                filter.memberUpdatedFilter = this.exFilters.memberUpdated;
                filter.memberRoleUpdatedFilter = this.exFilters.memberRoleUpdated;
                filter.messageDeletedFilter = this.exFilters.messageDeleted;
            }

            return filter;
        }
    }

    updateForm(filter: AuditLogListParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            channelId: filter.channelId,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo,
            ignoreBots: filter.ignoreBots,
            processedUserIds: filter.processedUserIds,
            types: filter.types,
            ids: filter.ids,
            excludedTypes: filter.excludedTypes,
            onlyFromStart: filter.onlyFromStart,
            onlyWithFiles: filter.onlyWithFiles
        });

        this.setExtendedFilters(filter);
    }

    initForm(filter: AuditLogListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelId: [filter.channelId],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo],
            ignoreBots: [filter.ignoreBots],
            processedUserIds: [filter.processedUserIds],
            types: [filter.types],
            ids: [filter.ids, Validators.pattern('^[0-9,]*$')],
            excludedTypes: [filter.excludedTypes],
            onlyFromStart: [filter.onlyFromStart],
            onlyWithFiles: [filter.onlyWithFiles]
        });

        this.setExtendedFilters(filter);
    }

    setExtendedFilters(filter: AuditLogListParams): void {
        this.exFilters = {
            info: filter.infoFilter,
            warning: filter.warningFilter,
            error: filter.errorFilter,
            interaction: filter.interactionFilter,
            job: filter.jobFilter,
            api: filter.apiRequestFilter,
            overwriteCreated: filter.overwriteCreatedFilter,
            overwriteDeleted: filter.overwriteDeletedFilter,
            overwriteUpdated: filter.overwriteUpdatedFilter,
            memberUpdated: filter.memberUpdatedFilter,
            memberRoleUpdated: filter.memberRoleUpdatedFilter,
            messageDeleted: filter.messageDeletedFilter
        };
    }
}
