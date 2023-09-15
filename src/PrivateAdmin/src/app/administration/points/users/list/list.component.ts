import { Component } from '@angular/core';
import { ObservablePaginatedData, PaginatedParams } from 'src/app/core/models/common';
import { UserListRequest } from 'src/app/core/models/points';
import { PointsService } from 'src/app/core/services/points.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<UserListRequest> {
    constructor(
        private service: PointsService
    ) {
        super();
    }

    configure(): void { }

    getRequest(pagination: PaginatedParams): ObservablePaginatedData<any> {
        this.filter.set(pagination, this.sort);
        return this.service.getUserList(this.filter);
    }
}
