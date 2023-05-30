import { UntypedFormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { GetReminderListParams } from 'src/app/core/models/reminder';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetReminderListParams> {
    constructor(fb: UntypedFormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'ReminderList';
    }

    deserializeData(data: any): GetReminderListParams {
        return GetReminderListParams.create(data);
    }

    createData(empty: boolean): GetReminderListParams {
        if (empty) {
            return GetReminderListParams.empty;
        } else {
            return GetReminderListParams.create(this.form.value);
        }
    }

    updateForm(filter: GetReminderListParams): void {
        this.form.patchValue({
            fromUserId: filter.fromUserId,
            messageContains: filter.messageContains,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo,
            onlyWaiting: filter.onlyWaiting
        });
    }

    initForm(filter: GetReminderListParams): void {
        this.form = this.fb.group({
            fromUserId: [filter.fromUserId],
            messageContains: [filter.messageContains],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo],
            onlyWaiting: [filter.onlyWaiting]
        });
    }
}
