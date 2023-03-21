import { PaginatedParams, Dictionary, PaginatedResponse } from './../../../core/models/common';
import { Component } from '@angular/core';
import { UnverifyLogParams } from 'src/app/core/models/unverify';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataService } from 'src/app/core/services/data.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent extends ListComponentBase<UnverifyLogParams> {
    channels: Dictionary<string, string>;

    constructor(
        private unverifyService: UnverifyService,
        private dataService: DataService
    ) { super(); }

    configure(): void {
        this.sort.descending = true;
        this.sort.orderBy = 'Id';

        this.dataService.getChannels().subscribe(channels => this.channels = channels);
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.unverifyService.getUnverifyLog(this.filter);
    }

    resolveChannelName(id: string): string | null {
        if (!this.channels) { return ''; }
        return this.channels.find(o => o.key === id)?.value ?? '';
    }
}
