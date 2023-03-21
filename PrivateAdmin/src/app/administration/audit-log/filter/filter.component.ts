/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExtendedFiltersModalData } from './extended-filters/filters-modal-result';
import { Dictionary } from 'src/app/core/models/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuditLogListParams } from 'src/app/core/models/audit-log';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuditLogItemType, AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Support } from 'src/app/core/lib/support';
import { ModalService } from 'src/app/shared/modal';
import { ExtendedFiltersModalComponent } from './extended-filters/extended-filters-modal/extended-filters-modal.component';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<AuditLogListParams> {
    types: Dictionary<number, string>;
    extendedFilters: ExtendedFiltersModalData;

    constructor(
        fb: FormBuilder,
        storage: StorageService,
        private modal: ModalService
    ) { super(fb, storage); }

    get guildId(): string { return this.form.get('guildId').value as string; }
    get selectedTypes(): AuditLogItemType[] { return this.form.get('types').value as AuditLogItemType[]; }
    get excludedTypes(): AuditLogItemType[] { return this.form.get('excludedTypes').value as AuditLogItemType[]; }

    get allowExtendedFilters(): boolean {
        const typesWithFilters = [
            AuditLogItemType.Info,
            AuditLogItemType.Warning,
            AuditLogItemType.Error,
            AuditLogItemType.Command,
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
            this.extendedFilters = null;
            return AuditLogListParams.empty;
        } else {
            const filter = AuditLogListParams.create(this.form.value);

            if (this.extendedFilters) {
                filter.infoFilter = this.extendedFilters.infoFilter;
                filter.warningFilter = this.extendedFilters.warningFilter;
                filter.errorFilter = this.extendedFilters.errorFilter;

                filter.commandFilter = this.extendedFilters.commandFilter;
                filter.interactionFilter = this.extendedFilters.interactionFilter;
                filter.jobFilter = this.extendedFilters.jobFilter;
                filter.apiRequestFilter = this.extendedFilters.apiRequestFilter;
                filter.overwriteCreatedFilter = this.extendedFilters.overwriteCreatedFilter;
                filter.overwriteDeletedFilter = this.extendedFilters.overwriteDeletedFilter;
                filter.overwriteUpdatedFilter = this.extendedFilters.overwriteUpdatedFilter;
                filter.memberRoleUpdatedFilter = this.extendedFilters.memberRoleUpdatedFilter;
                filter.memberUpdatedFilter = this.extendedFilters.memberUpdatedFilter;
                filter.messageDeletedFilter = this.extendedFilters.messageDeletedFilter;
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
        this.extendedFilters = {
            commandFilter: filter.commandFilter,
            errorFilter: filter.errorFilter,
            infoFilter: filter.infoFilter,
            interactionFilter: filter.interactionFilter,
            jobFilter: filter.jobFilter,
            warningFilter: filter.warningFilter,
            apiRequestFilter: filter.apiRequestFilter,
            overwriteCreatedFilter: filter.overwriteCreatedFilter,
            overwriteDeletedFilter: filter.overwriteDeletedFilter,
            overwriteUpdatedFilter: filter.overwriteUpdatedFilter,
            memberRoleUpdatedFilter: filter.memberRoleUpdatedFilter,
            memberUpdatedFilter: filter.memberUpdatedFilter,
            messageDeletedFilter: filter.messageDeletedFilter
        };
    }

    openExtendedFiltersModal(): void {
        const modal = this.modal.showCustomModal<ExtendedFiltersModalComponent>(ExtendedFiltersModalComponent, 'xl');
        modal.componentInstance.selectedTypes = this.selectedTypes;
        modal.componentInstance.result = this.extendedFilters;

        modal.onAccept.subscribe(_ => {
            this.extendedFilters = modal.componentInstance.result;
            this.submitForm();
        });
    }
}
