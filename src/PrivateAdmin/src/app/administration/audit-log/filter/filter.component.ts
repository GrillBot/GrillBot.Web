/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Dictionary } from 'src/app/core/models/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { AdvancedSearchRequest, SearchRequest } from 'src/app/core/models/audit-log';
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
export class FilterComponent extends FilterComponentBase<SearchRequest> {
    types: Dictionary<number, string>;
    exFilters: ExtendedFilterData;

    constructor(
        fb: UntypedFormBuilder,
        storage: StorageService,
    ) { super(fb, storage); }

    get guildId(): string { return this.form.get('guildId').value as string; }
    get selectedTypes(): AuditLogItemType[] { return this.form.get('showTypes').value as AuditLogItemType[]; }
    get excludedTypes(): AuditLogItemType[] { return this.form.get('ignoreTypes').value as AuditLogItemType[]; }
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

    deserializeData(data: any): SearchRequest {
        return SearchRequest.create(data);
    }

    createData(empty: boolean): SearchRequest {
        if (empty) {
            this.exFilters = null;
            return SearchRequest.empty;
        } else {
            const filter = SearchRequest.create(this.form.value);

            if (this.exFilters) {
                const request = new AdvancedSearchRequest();

                request.info = this.exFilters.info;
                request.warning = this.exFilters.warning;
                request.error = this.exFilters.error;
                request.interaction = this.exFilters.interaction;
                request.job = this.exFilters.job;
                request.api = this.exFilters.api;
                request.overwriteCreated = this.exFilters.overwriteCreated;
                request.overwriteDeleted = this.exFilters.overwriteCreated;
                request.overwriteUpdated = this.exFilters.overwriteUpdated;
                request.memberUpdated = this.exFilters.memberUpdated;
                request.memberRolesUpdated = this.exFilters.memberRoleUpdated;
                request.messageDeleted = this.exFilters.messageDeleted;
                filter.advancedSearch = request;
            }

            return filter;
        }
    }

    updateForm(filter: SearchRequest): void {
        this.form.patchValue({
            guildId: filter.guildId,
            channelId: filter.channelId,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo,
            userIds: filter.userIds,
            showTypes: filter.showTypes,
            serializedIds: filter.serializedIds,
            ignoreTypes: filter.ignoreTypes,
            onlyWithFiles: filter.onlyWithFiles
        });

        this.setExtendedFilters(filter);
    }

    initForm(filter: SearchRequest): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelId: [filter.channelId],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo],
            userIds: [filter.userIds],
            showTypes: [filter.showTypes],
            serializedIds: [filter.serializedIds],
            ignoreTypes: [filter.ignoreTypes],
            onlyWithFiles: [filter.onlyWithFiles]
        });

        this.setExtendedFilters(filter);
    }

    setExtendedFilters(filter: SearchRequest): void {
        this.exFilters = {
            info: filter.advancedSearch?.info,
            warning: filter.advancedSearch?.warning,
            error: filter.advancedSearch?.error,
            interaction: filter.advancedSearch?.interaction,
            job: filter.advancedSearch?.job,
            api: filter.advancedSearch?.api,
            overwriteCreated: filter.advancedSearch?.overwriteCreated,
            overwriteDeleted: filter.advancedSearch?.overwriteDeleted,
            overwriteUpdated: filter.advancedSearch?.overwriteUpdated,
            memberUpdated: filter.advancedSearch?.memberUpdated,
            memberRoleUpdated: filter.advancedSearch?.memberRolesUpdated,
            messageDeleted: filter.advancedSearch?.messageDeleted
        };
    }
}
