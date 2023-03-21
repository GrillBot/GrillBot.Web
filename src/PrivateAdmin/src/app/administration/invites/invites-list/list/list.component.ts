import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { PaginatedResponse } from './../../../../core/models/common';
import { Component } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetInviteListParams, GuildInvite } from 'src/app/core/models/invites';
import { InviteService } from 'src/app/core/services/invite.service';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetInviteListParams> {
    constructor(
        private inviteService: InviteService,
        private modalService: ModalService
    ) { super(); }

    configure(): void {
        this.sort.descending = true;
        this.sort.orderBy = 'CreatedAt';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.inviteService.getInviteList(this.filter);
    }

    deleteInvite(invite: GuildInvite): void {
        const message = `Opravdu si přejete smazat pozvánku s kódem <b>${invite.code}</b> ze serveru <b>${invite.guild.name}?</b><br>` +
            (invite.usedUsersCount > 0 ? `Počet použití pozvánky je <b>${invite.usedUsersCount}</b>.` : '');

        this.modalService.showQuestion('Smazat pozvánku', message).onAccept.subscribe(() => {
            this.inviteService.deleteInvite(invite.guild.id, invite.code).subscribe(() => {
                this.reload();
                this.modalService.showNotification('Smazat pozvánku', 'Pozvánka byla úspěšně vymazána.');
            });
        });
    }
}
