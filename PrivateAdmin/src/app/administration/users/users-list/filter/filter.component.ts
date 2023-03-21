/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SelectItems } from './../../../../shared/select/models';
import { ActivatedRoute } from '@angular/router';
import { Dictionary } from './../../../../core/models/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GetUserListParams } from 'src/app/core/models/users';
import { StorageService } from 'src/app/core/services/storage.service';
import { Support } from 'src/app/core/lib/support';
import { UserFilterFlags, UserFilterFlagsTexts } from 'src/app/core/models/enums/user-filter-flags';
import { UserStatus, getStatusSelectItem } from 'src/app/core/models/enums/user-status';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetUserListParams> {
    flagsMask: Dictionary<number, string>;
    statusItems: SelectItems = [
        getStatusSelectItem(UserStatus.Online),
        getStatusSelectItem(UserStatus.Idle),
        getStatusSelectItem(UserStatus.DoNotDisturb),
        getStatusSelectItem(UserStatus.Offline)
    ];

    constructor(
        fb: FormBuilder,
        storage: StorageService,
        private activatedRoute: ActivatedRoute
    ) { super(fb, storage); }

    get usedInviteCode(): string | null {
        return this.activatedRoute.snapshot.queryParams.usedInviteCode as string;
    }

    get canChangeUsedInviteCode(): boolean {
        return !this.usedInviteCode;
    }

    configure(): void {
        this.filterId = 'UserList';

        this.flagsMask = Object.keys(UserFilterFlags).map(o => parseInt(o, 10)).filter(o => !isNaN(o) && o > 0).map(o => ({
            key: o,
            value: UserFilterFlagsTexts[Support.getEnumKeyByValue(UserFilterFlags, o)] as string
        }));
    }

    deserializeData(data: any): GetUserListParams {
        const result = GetUserListParams.create(data);
        if (!this.canChangeUsedInviteCode) {
            result.usedInviteCode = this.usedInviteCode;
        }

        return result;
    }

    createData(empty: boolean): GetUserListParams {
        let parameters: GetUserListParams;

        if (empty) {
            parameters = GetUserListParams.empty;
        } else {
            parameters = GetUserListParams.create(this.form.value);
        }

        if (!this.canChangeUsedInviteCode) {
            parameters.usedInviteCode = this.usedInviteCode;
        }

        return parameters;
    }

    updateForm(filter: GetUserListParams): void {
        this.form.patchValue({
            username: filter.username,
            guildId: filter.guildId,
            flags: filter.flags,
            usedInviteCode: filter.usedInviteCode,
            status: filter.status
        });
    }

    initForm(filter: GetUserListParams): void {
        this.form = this.fb.group({
            username: [filter.username],
            guildId: [filter.guildId],
            flags: [filter.serializeFlags()],
            usedInviteCode: [filter.usedInviteCode],
            status: [filter.status]
        });

        if (!this.canChangeUsedInviteCode) {
            this.form.get('usedInviteCode').disable();
        }
    }
}
