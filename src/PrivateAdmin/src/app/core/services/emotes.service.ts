import { ObservablePaginatedData } from './../models/common';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {
    EmotesListParams, EmoteStatItem, EmoteStatsUserListItem, EmoteStatsUserListParams,
    GuildEmoteStatItem, MergeEmoteStatsParams
} from '../models/emotes';
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

    getStatsOfEmotes(params: EmotesListParams, unsupported: boolean): ObservablePaginatedData<GuildEmoteStatItem> {
        const url = this.base.createUrl(`emotes/stats/list/${unsupported ? 'true' : 'false'}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<GuildEmoteStatItem>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildEmoteStatItem.create(entity))),
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

    removeStatistics(emoteId: string, guildId: string): Observable<number> {
        const queryParams = [
            new QueryParam('emoteId', emoteId),
            new QueryParam('guildId', guildId)
        ];

        const url = this.base.createUrl('emotes/stats', queryParams);
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

    getStatOfEmote(guildId: string, emoteId: string, isUnsupported: boolean): Observable<EmoteStatItem> {
        const queryParams = [
            new QueryParam('guildId', guildId),
            new QueryParam('emoteId', emoteId),
            new QueryParam('isUnsupported', isUnsupported)
        ];

        const url = this.base.createUrl('emotes/stats', queryParams);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<EmoteStatItem>(url, { headers }).pipe(
            map(data => EmoteStatItem.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err, err.status === 404))
        );
    }
}
