import { Support } from './../../../core/lib/support';
import { UnverifyOperation, UnverifyOperationTexts } from './../../../core/models/enums/unverify-operation';
import { StorageService } from 'src/app/core/services/storage.service';
import { Dictionary } from './../../../core/models/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UnverifyLogParams } from 'src/app/core/models/unverify';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<UnverifyLogParams> {
    operations: Dictionary<string, string>;

    constructor(fb: FormBuilder, storage: StorageService) {
        super(fb, storage);
    }

    get guildId(): string | null { return this.form?.get('guildId')?.value as string; }

    configure(): void {
        this.filterId = 'UnverifyLog';

        this.operations = Object.keys(UnverifyOperation).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o.toString(), value: UnverifyOperationTexts[Support.getEnumKeyByValue(UnverifyOperation, o)] as string }));
    }

    deserializeData(data: any): UnverifyLogParams {
        return UnverifyLogParams.create(data);
    }

    createData(empty: boolean): UnverifyLogParams {
        if (empty) {
            return UnverifyLogParams.empty;
        } else {
            return UnverifyLogParams.create(this.form.value);
        }
    }

    updateForm(filter: UnverifyLogParams): void {
        this.form.patchValue({
            operation: filter.operation,
            guildId: filter.guildId,
            fromUserId: filter.fromUserId,
            toUserId: filter.toUserId,
            createdFrom: filter.created?.from,
            createdTo: filter.created?.to
        });
    }

    initForm(filter: UnverifyLogParams): void {
        this.form = this.fb.group({
            operation: [filter.operation],
            guildId: [filter.guildId],
            fromUserId: [filter.fromUserId],
            toUserId: [filter.toUserId],
            createdFrom: [filter.created?.from],
            createdTo: [filter.created?.to]
        });
    }
}
