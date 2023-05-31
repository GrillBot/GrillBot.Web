import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetReminderListParams, RemindMessage } from 'src/app/core/models/reminder';
import { ReminderService } from 'src/app/core/services/reminder.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { CustomComponentModal, QuestionModal } from 'src/app/shared/modal-box/models';
import { DetailModalComponent } from '../detail-modal/detail-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetReminderListParams> {
    constructor(
        private reminderService: ReminderService,
        private modalBox: ModalBoxService
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
        let message = `Opravdu si přejete zrušit oznámení pro uživatele ${item.toUser?.username}? `;
        if (notify) { message += 'Uživateli přijde předčasně oznámení.'; }

        const modal = new QuestionModal('Zrušení upozornění', message);
        modal.onAccept.subscribe(_ => {
            this.reminderService.cancelRemind(item.id, notify).subscribe(__ => this.list.filterChanged());
        });

        this.modalBox.show(modal);
    }

    showMessage(item: RemindMessage): void {
        this.modalBox.show(new CustomComponentModal(`Detail oznámení #${item.id}`, DetailModalComponent, null, item));
    }
}
