import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../models/common';
import { GetSearchingListParams, SearchingListItem } from '../models/searching';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SearchingService {
    constructor(
        private base: BaseService
    ) { }

    getSearchList(filter: GetSearchingListParams): Observable<PaginatedResponse<SearchingListItem>> {
        const url = this.base.createUrl('search/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<SearchingListItem>>(url, filter, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => SearchingListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
