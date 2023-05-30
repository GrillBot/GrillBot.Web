import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { GetReminderListParams, RemindMessage } from 'src/app/core/models/reminder';
import { ReminderService } from 'src/app/core/services/reminder.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal } from 'src/app/shared/modal-box/models';

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

    showMessage(item: RemindMessage, event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        this.modalBox.show(new InfoModal(`Obsah notifikace #${item.id}`, item.message));
    }
}
