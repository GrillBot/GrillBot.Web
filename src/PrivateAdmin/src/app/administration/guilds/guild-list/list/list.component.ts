import { noop, Observable } from 'rxjs';
import { GuildListFilter } from './../../../../core/models/guilds';
import { Component } from '@angular/core';
import { GuildService } from 'src/app/core/services/guild.service';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GuildListFilter> {
    constructor(
        private guildService: GuildService
    ) { super(); }

    configure(): void { noop(); }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, null);
        return this.guildService.getGuildList(this.filter);
    }
}
