import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedResponse, ObservableDict, Dictionary, EmptyObservable } from './../models/common';
import { Injectable } from '@angular/core';
import { GetInviteListParams, GuildInvite } from '../models/invites';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InviteService {
    constructor(
        private base: BaseService
    ) { }

    getInviteList(params: GetInviteListParams): Observable<PaginatedResponse<GuildInvite>> {
        const url = this.base.createUrl('invite/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<GuildInvite>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildInvite.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    refreshMetadataCache(): ObservableDict<string, number> {
        const url = this.base.createUrl('invite/metadata/refresh');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<Dictionary<string, number>>(url, null, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: parseInt(data[k], 10) }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getCurrentMetadataCount(): Observable<number> {
        const url = this.base.createUrl('invite/metadata/count');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<number>(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    deleteInvite(guildId: string, code: string): EmptyObservable {
        const url = this.base.createUrl(`invite/${guildId}/${code}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
