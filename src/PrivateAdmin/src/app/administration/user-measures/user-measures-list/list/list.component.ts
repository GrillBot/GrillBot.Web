import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { MeasuresListParams } from 'src/app/core/models/user-measures';
import { UserMeasuresService } from 'src/app/core/services/user-measures.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent extends ListComponentBase<MeasuresListParams> {
    constructor(
        private userMeasuresService: UserMeasuresService
    ) { super(); }

    configure(): void {
    }

    getRequest(pagination: PaginatedParams): Observable<PaginatedResponse<any>> {
        this.filter.set(pagination, this.sort);
        return this.userMeasuresService.getUserMeasuresList(this.filter);
    }

}
