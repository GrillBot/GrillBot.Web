import { GraphModalComponent } from '../graph-modal/graph-modal.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';
import { StorageService } from 'src/app/core/services/storage.service';
import { AdminListRequest } from 'src/app/core/models/points';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<AdminListRequest> {
    constructor(
        fb: FormBuilder,
        storage: StorageService,
        private route: ActivatedRoute,
        private modalService: ModalService
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

    showGraph(): void {
        const modal = this.modalService.showCustomModal<GraphModalComponent>(GraphModalComponent, 'xl');
        modal.componentInstance.filter = this.createData(false);
        modal.componentInstance.isMerged = this.isMerged;
    }
}
