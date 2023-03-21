import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { Dictionary } from 'src/app/core/models/common';
import { GetChannelListParams } from './../../../../core/models/channels';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { ChannelType } from 'src/app/core/models/enums/channel-type';
import { Support } from 'src/app/core/lib/support';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GetChannelListParams> {
    channelTypes: Dictionary<number, string>;

    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'ChannelList';
        this.channelTypes = Object.keys(ChannelType).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: Support.getEnumKeyByValue(ChannelType, o) }));
    }

    deserializeData(data: any): GetChannelListParams {
        return GetChannelListParams.create(data);
    }

    createData(empty: boolean): GetChannelListParams {
        if (empty) {
            return GetChannelListParams.empty;
        } else {
            return GetChannelListParams.create(this.form.value);
        }
    }

    updateForm(filter: GetChannelListParams): void {
        this.form.patchValue({
            guildId: filter.guildId,
            channelType: filter.channelType,
            nameContains: filter.nameContains,
            hideDeleted: filter.hideDeleted
        });
    }

    initForm(filter: GetChannelListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelType: [filter.channelType],
            nameContains: [filter.nameContains],
            hideDeleted: [filter.hideDeleted]
        });
    }
}
