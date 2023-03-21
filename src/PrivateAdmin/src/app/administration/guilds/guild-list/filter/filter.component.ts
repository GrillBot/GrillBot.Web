import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GuildListFilter } from 'src/app/core/models/guilds';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<GuildListFilter> {
    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    configure(): void {
        this.filterId = 'GuildList';
    }

    deserializeData(data: any): GuildListFilter {
        return GuildListFilter.create(data);
    }

    createData(empty: boolean): GuildListFilter {
        if (empty) {
            return GuildListFilter.empty;
        } else {
            return GuildListFilter.create(this.form.value);
        }
    }

    initForm(filter: GuildListFilter): void {
        this.form = this.fb.group({
            nameQuery: [filter.nameQuery]
        });
    }

    updateForm(filter: GuildListFilter): void {
        this.form.patchValue({
            nameQuery: filter.nameQuery
        });
    }
}
