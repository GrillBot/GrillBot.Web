import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { EmotesListParams } from 'src/app/core/models/emotes';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<EmotesListParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'EmotesList';
    }

    deserializeData(data: any): EmotesListParams {
        return EmotesListParams.create(data);
    }

    createData(empty: boolean): EmotesListParams {
        if (empty) {
            return EmotesListParams.empty;
        } else {
            return EmotesListParams.create(this.form.value);
        }
    }

    updateForm(filter: EmotesListParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            useCountFrom: filter.useCount?.from,
            useCountTo: filter.useCount?.to,
            firstOccurenceFrom: filter.firstOccurence?.from,
            firstOccurenceTo: filter.firstOccurence?.to,
            lastOccurenceFrom: filter.lastOccurence?.from,
            lastOccurenceTo: filter.lastOccurence?.to,
            filterAnimated: filter.filterAnimated,
            emoteName: filter.emoteName
        });
    }

    initForm(filter: EmotesListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            useCountFrom: [filter.useCount?.from, Validators.min(0)],
            useCountTo: [filter.useCount?.to, Validators.min(0)],
            firstOccurenceFrom: [filter.firstOccurence?.from],
            firstOccurenceTo: [filter.firstOccurence?.to],
            lastOccurenceFrom: [filter.lastOccurence?.from],
            lastOccurenceTo: [filter.lastOccurence?.to],
            filterAnimated: [filter.filterAnimated],
            emoteName: [filter.emoteName]
        });
    }
}
