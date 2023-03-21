import { Component } from '@angular/core';
import { GetUserListParams } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/services/user.service';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<GetUserListParams> {
    constructor(
        private userService: UserService
    ) { super(); }

    configure(): void {
        this.sort.descending = false;
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.userService.getUsersList(this.filter);
    }
}
