import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetReminderListParams, RemindMessage } from 'src/app/core/models/reminder';
import { ReminderService } from 'src/app/core/services/reminder.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalService } from 'src/app/shared/modal';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetReminderListParams> {
    constructor(
        private reminderService: ReminderService,
        private modalService: ModalService
    ) { super(); }

    configure(): void {
        this.sort.orderBy = 'Id';
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.reminderService.getReminderList(this.filter);
    }

    cancel(item: RemindMessage, notify: boolean): void {
        let message = `Opravdu si přeješ zrušit oznámení pro uživatele ${item.toUser?.fullUsername}? `;
        if (notify) { message += 'Uživateli přijde předčasně oznámení.'; }

        this.modalService.showQuestion('Zrušení upozornění', message).onAccept.subscribe(_ => {
            this.reminderService.cancelRemind(item.id, notify).subscribe(__ => this.list.filterChanged());
        });
    }

    showMessage(item: RemindMessage): void {
        const modal = this.modalService.showCustomModal<DetailModalComponent>(DetailModalComponent);
        modal.componentInstance.item = item;
    }
}
