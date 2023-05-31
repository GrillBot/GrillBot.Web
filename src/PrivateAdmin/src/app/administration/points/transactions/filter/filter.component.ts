import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { StorageService } from 'src/app/core/services/storage.service';
import { AdminListRequest } from 'src/app/core/models/points';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<AdminListRequest> {
    constructor(
        fb: UntypedFormBuilder,
        storage: StorageService,
        private route: ActivatedRoute
    ) {
        super(fb, storage);
    }

    get isMerged(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.route.snapshot.data?.merged ?? false;
    }

    get guildId(): string | null { return this.form?.get('guildId')?.value as string; }

    configure(): void {
        this.filterId = 'PointTransactions' + (this.isMerged ? '-Merged' : '');
    }

    deserializeData(data: any): AdminListRequest {
        return AdminListRequest.fromForm(data);
    }

    createData(empty: boolean): AdminListRequest {
        if (empty) {
            return AdminListRequest.empty;
        } else {
            return AdminListRequest.fromForm(this.form.value);

        }
    }

    updateForm(filter: AdminListRequest): void {
        this.form.patchValue({
            guildId: filter.guildId,
            userId: filter.userId,
            assignedAtFrom: filter.createdFrom,
            assignedAtTo: filter.createdTo,
            onlyReactions: filter.onlyReactions,
            onlyMessages: filter.onlyMessages,
            messageId: !this.isMerged ? filter.messageId : null
        });
    }

    initForm(filter: AdminListRequest): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            userId: [filter.userId],
            assignedAtFrom: [filter.createdFrom],
            assignedAtTo: [filter.createdTo],
            onlyReactions: [filter.onlyReactions],
            onlyMessages: [filter.onlyMessages],
            messageId: [this.isMerged ? null : filter.messageId]
        });

        this.form.get('onlyReactions').valueChanges.subscribe(onlyReactions => {
            if (onlyReactions) {
                this.form.get('onlyMessages').setValue(false, { emitEvent: false });
            }
        });

        this.form.get('onlyMessages').valueChanges.subscribe(onlyMessages => {
            if (onlyMessages) {
                this.form.get('onlyReactions').setValue(false, { emitEvent: false });
            }
        });
    }
}
