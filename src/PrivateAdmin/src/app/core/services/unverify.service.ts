import { HttpErrorResponse } from '@angular/common/http';
import { UnverifyLogParams, UnverifyLogItem, UpdateUnverifyParams } from './../models/unverify';
import { catchError, map } from 'rxjs/operators';
import { EmptyObservable, ObservableList, PaginatedResponse } from './../models/common';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnverifyUserProfile } from '../models/unverify';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/http';

/* eslint-disable @typescript-eslint/indent */
@Injectable({ providedIn: 'root' })
export class UnverifyService {
    constructor(
        private base: BaseService
    ) { }

    getCurrentUnverifies(): ObservableList<UnverifyUserProfile> {
        const url = this.base.createUrl('unverify/current');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UnverifyUserProfile[]>(url, { headers }).pipe(
            map(data => data.map(o => UnverifyUserProfile.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeUnverify(guildId: string, userId: string, force: boolean): EmptyObservable {
        const parameters = [new QueryParam('force', force)];
        const url = this.base.createUrl(`unverify/${guildId}/${userId}`, parameters);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateUnverifyTime(guildId: string, userId: string, params: UpdateUnverifyParams): Observable<string> {
        const url = this.base.createUrl(`unverify/${guildId}/${userId}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put<{ message: string }>(url, params, { headers }).pipe(
            map(data => data.message),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUnverifyLog(filter: UnverifyLogParams): Observable<PaginatedResponse<UnverifyLogItem>> {
        const url = this.base.createUrl('unverify/log');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<UnverifyLogItem>>(url, filter, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => UnverifyLogItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    recoverUnverifyState(logId: number): EmptyObservable {
        const url = this.base.createUrl(`unverify/log/${logId}/recover`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
