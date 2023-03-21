import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { GetSuggestionListParams } from 'src/app/core/models/suggestions';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetSuggestionListParams> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    get guildId(): string | null { return this.form?.get('guildId')?.value as string; }

    configure(): void {
        this.filterId = 'EmoteSuggestions';
    }

    deserializeData(data: any): GetSuggestionListParams {
        return GetSuggestionListParams.create(data);
    }

    createData(empty: boolean): GetSuggestionListParams {
        if (empty) {
            return GetSuggestionListParams.empty;
        } else {
            return GetSuggestionListParams.create(this.form.value);
        }
    }

    updateForm(filter: GetSuggestionListParams): void {
        this.form.patchValue({
            createdAtFrom: filter.createdAt?.from,
            createdAtTo: filter.createdAt?.to,
            guildId: filter.guildId,
            fromUserId: filter.fromUserId,
            emoteName: filter.emoteName,
            onlyApprovedToVote: filter.onlyApprovedToVote,
            onlyUnfinishedVotes: filter.onlyUnfinishedVotes,
            onlyCommunityApproved: filter.onlyCommunityApproved
        });
    }

    initForm(filter: GetSuggestionListParams): void {
        this.form = this.fb.group({
            createdAtFrom: [filter.createdAt?.from],
            createdAtTo: [filter.createdAt?.to],
            guildId: [filter.guildId],
            fromUserId: [filter.fromUserId],
            emoteName: [filter.emoteName],
            onlyApprovedToVote: [filter.onlyApprovedToVote],
            onlyUnfinishedVotes: [filter.onlyUnfinishedVotes],
            onlyCommunityApproved: [filter.onlyCommunityApproved]
        });
    }
}
