import { ObservablePaginatedData } from './../models/common';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { EmotesListParams, EmoteStatItem, EmoteStatsUserListItem, EmoteStatsUserListParams, MergeEmoteStatsParams } from '../models/emotes';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { QueryParam } from '../models/http';

@Injectable({ providedIn: 'root' })
export class EmotesService {
    constructor(
        private base: BaseService
    ) { }

    getStatsOfEmotes(params: EmotesListParams, unsupported: boolean): ObservablePaginatedData<EmoteStatItem> {
        const url = this.base.createUrl(`emotes/stats/list/${unsupported ? 'true' : 'false'}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<EmoteStatItem>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => EmoteStatItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    mergeStatsToAnother(params: MergeEmoteStatsParams): Observable<number> {
        const url = this.base.createUrl('emotes/stats/merge');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<number>(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeStatistics(emoteId: string): Observable<number> {
        const url = this.base.createUrl('emotes/stats', [new QueryParam('emoteId', emoteId)]);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete<number>(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserStatisticsOfEmote(params: EmoteStatsUserListParams): ObservablePaginatedData<EmoteStatsUserListItem> {
        const url = this.base.createUrl('emotes/list/users');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<EmoteStatsUserListItem>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => EmoteStatsUserListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getStatOfEmote(emoteId: string): Observable<EmoteStatItem> {
        const url = this.base.createUrl('emotes/stats', [new QueryParam('emoteId', emoteId)]);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<EmoteStatItem>(url, { headers }).pipe(
            map(data => EmoteStatItem.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err, err.status === 404))
        );
    }
}
