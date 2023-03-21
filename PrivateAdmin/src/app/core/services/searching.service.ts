import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '../models/common';
import { GetSearchingListParams, SearchingListItem } from '../models/searching';
import { BaseService } from './base.service';
import { QueryParam } from '../models/http';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

/* eslint-disable @typescript-eslint/type-annotation-spacing */
@Injectable({ providedIn: 'root' })
export class SearchingService {
    constructor(
        private base: BaseService
    ) { }

    getSearchList(filter: GetSearchingListParams)
        : Observable<PaginatedResponse<SearchingListItem>> {
        const url = this.base.createUrl('search/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<SearchingListItem>>(url, filter, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => SearchingListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeSearches(ids: number[]): Observable<unknown> {
        const parameters = ids.map(o => new QueryParam('id', o));
        const url = this.base.createUrl('search', parameters);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
