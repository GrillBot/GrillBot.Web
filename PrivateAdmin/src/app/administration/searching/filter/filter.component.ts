import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { GetSearchingListParams } from 'src/app/core/models/searching';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetSearchingListParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    get guildId(): string { return this.form.get('guildId').value as string; }

    configure(): void {
        this.filterId = 'SearchingList';
    }

    deserializeData(data: any): GetSearchingListParams {
        return GetSearchingListParams.create(data);
    }

    createData(empty: boolean): GetSearchingListParams {
        if (empty) {
            return GetSearchingListParams.empty;
        } else {
            return GetSearchingListParams.create(this.form.value);
        }
    }

    updateForm(filter: GetSearchingListParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            channelId: filter.channelId,
            userId: filter.userId,
            messageQuery: filter.messageQuery
        });
    }

    initForm(filter: GetSearchingListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelId: [filter.channelId],
            userId: [filter.userId],
            messageQuery: [filter.messageQuery]
        });
    }
}
