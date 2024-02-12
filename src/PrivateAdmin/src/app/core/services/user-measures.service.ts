import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CreateUserMeasuresWarningParams, UserMeasuresListItem, MeasuresListParams } from '../models/user-measures';
import { EmptyObservable, ObservablePaginatedData, PaginatedResponse } from '../models/common';
import { catchError, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserMeasuresService {
    constructor(
        public base: BaseService
    ) { }

    getUserMeasuresList(filter: MeasuresListParams): ObservablePaginatedData<UserMeasuresListItem> {
        const url = this.base.createUrl('user/measures/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<UserMeasuresListItem>>(url, filter, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => UserMeasuresListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    createUserMeasuresWarning(params: CreateUserMeasuresWarningParams): EmptyObservable {
        const url = this.base.createUrl('user/measures/create');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
