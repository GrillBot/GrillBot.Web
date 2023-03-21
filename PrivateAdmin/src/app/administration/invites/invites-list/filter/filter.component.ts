import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { GetInviteListParams } from 'src/app/core/models/invites';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetInviteListParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    get guildId(): string | null { return this.form?.get('guildId')?.value as string; }

    configure(): void {
        this.filterId = 'InviteList';
    }

    deserializeData(data: any): GetInviteListParams {
        return GetInviteListParams.create(data);
    }

    createData(empty: boolean): GetInviteListParams {
        if (empty) {
            return GetInviteListParams.empty;
        } else {
            return GetInviteListParams.create(this.form.value);
        }
    }

    updateForm(filter: GetInviteListParams): void {
        this.form.patchValue({
            code: filter.code,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo,
            creatorId: filter.creatorId,
            guildId: filter.guildId,
            showUnused: filter.showUnused
        });
    }

    initForm(filter: GetInviteListParams): void {
        this.form = this.fb.group({
            code: [filter.code],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo],
            creatorId: [filter.creatorId],
            guildId: [filter.guildId],
            showUnused: [filter.showUnused]
        });
    }
}
