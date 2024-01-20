import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { UserMeasuresType, UserMeasuresTypeText } from 'src/app/core/models/enums/user-measures-type';
import { UserMeasuresParams } from 'src/app/core/models/user-measures';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { SelectItems } from 'src/app/shared/select/models';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<UserMeasuresParams> {
    typeItems: SelectItems = [
        { key: UserMeasuresTypeText.Unverify, value: UserMeasuresType.Unverify },
        { key: UserMeasuresTypeText.Timeout, value: UserMeasuresType.Timeout },
        { key: UserMeasuresTypeText.Warning, value: UserMeasuresType.Warning }
    ];

    constructor(
        fb: UntypedFormBuilder,
        storage: StorageService
    ) { super(fb, storage); }

    configure(): void {
        this.filterId = 'UserMeasuresList';
    }

    deserializeData(data: any): UserMeasuresParams {
        return UserMeasuresParams.create(data);
    }

    createData(empty: boolean): UserMeasuresParams {
        return empty ? UserMeasuresParams.empty : UserMeasuresParams.create(this.form.value);
    }

    updateForm(filter: UserMeasuresParams): void {
        this.form.patchValue({
            type: filter.type,
            guildId: filter.guildId,
            userId: filter.userId,
            moderatorId: filter.moderatorId,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo
        });
    }

    initForm(filter: UserMeasuresParams): void {
        this.form = this.fb.group({
            type: [filter.type],
            guildId: [filter.guildId],
            userId: [filter.userId],
            moderatorId: [filter.moderatorId],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo]
        });
    }
}
