import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserListRequest } from 'src/app/core/models/points';
import { StorageService } from 'src/app/core/services/storage.service';
import { FilterComponentBase } from 'src/app/shared/common-page/filter-component-base';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent extends FilterComponentBase<UserListRequest> {
    constructor(
        fb: UntypedFormBuilder,
        storage: StorageService,
        private route: ActivatedRoute
    ) {
        super(fb, storage);
    }

    get guildId(): string | null { return this.form?.get('guildId')?.value as string; }

    configure(): void {
        this.filterId = 'PointsUsersList';
    }

    deserializeData(data: any): UserListRequest {
        return UserListRequest.fromForm(data);
    }

    createData(empty: boolean): UserListRequest {
        if (empty) {
            return UserListRequest.empty;
        } else {
            return UserListRequest.fromForm(this.form.value);
        }
    }

    updateForm(filter: UserListRequest): void {
        this.form.patchValue({
            guildId: filter.guildId,
        });
    }

    initForm(filter: UserListRequest): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
        });
    }
}
