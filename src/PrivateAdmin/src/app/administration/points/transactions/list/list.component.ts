import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { AdminListRequest, PointsTransaction } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<AdminListRequest> {
    constructor(
        private service: PointsService,
        private route: ActivatedRoute,
        private modal: ModalService
    ) {
        super();
    }

    get isMerged(): boolean {
        return this.route.snapshot.data?.merged ?? false;
    }

    configure(): void {
        this.sort.descending = true;
        this.sort.orderBy = 'AssignedAt';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.showMerged = this.isMerged;
        this.filter.set(pagination, this.sort);
        return this.service.getTransactionList(this.filter);
    }

    removeTransaction(item: PointsTransaction): void {
        const title = 'Smazání transakce';

        this.modal.showQuestion(title,
            `Opravdu si přejete smazat transakci pro zprávu s ID ${item.messageId} od uživatele ${item.user.username}?`
        ).onAccept.subscribe(() => {
            this.service.removeTransaction(item.guild.id, item.messageId, item.reactionId).subscribe(() => {
                this.modal.showNotification(title, 'Transakce byla úspěšně smazána.').onClose.subscribe(() => this.reload());
            });
        });
    }
}
