import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { UserMeasuresTypeText } from 'src/app/core/models/enums/user-measures-type';
import { MeasuresListParams } from 'src/app/core/models/user-measures';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { SelectItems } from 'src/app/shared/select/models';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<MeasuresListParams> {
    typeItems: SelectItems = [
        { key: UserMeasuresTypeText.Unverify, value: 'Unverify' },
        { key: UserMeasuresTypeText.Timeout, value: 'Timeout' },
        { key: UserMeasuresTypeText.Warning, value: 'Warning' }
    ];

    constructor(
        fb: UntypedFormBuilder,
        storage: StorageService
    ) { super(fb, storage); }

    configure(): void {
        this.filterId = 'UserMeasuresList';
    }

    deserializeData(data: any): MeasuresListParams {
        return MeasuresListParams.create(data);
    }

    createData(empty: boolean): MeasuresListParams {
        return empty ? MeasuresListParams.empty : MeasuresListParams.create(this.form.value);
    }

    updateForm(filter: MeasuresListParams): void {
        this.form.patchValue({
            type: filter.type,
            guildId: filter.guildId,
            userId: filter.userId,
            moderatorId: filter.moderatorId,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo
        });
    }

    initForm(filter: MeasuresListParams): void {
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
