import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GetChannelListParams } from 'src/app/core/models/channels';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { ChannelService } from 'src/app/core/services/channel.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetChannelListParams> {
    constructor(
        private channelService: ChannelService
    ) { super(); }

    configure(): void {
        this.sort.descending = false;
        this.sort.orderBy = 'Name';
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.channelService.getChannelsList(this.filter);
    }
}
