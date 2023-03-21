import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedResponse, EmptyObservable } from './../models/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import {
    ChannelDetail, ChannelUserStatItem, GetChannelListParams,
    SendMessageToChannelParams, GuildChannelListItem, UpdateChannelParams
} from '../models/channels';
import { PaginatedParams } from '../models/common';

/* eslint-disable @typescript-eslint/indent */
@Injectable({ providedIn: 'root' })
export class ChannelService {
    constructor(
        private base: BaseService
    ) { }

    sendMessageToChannel(guildId: string, channelId: string, params: SendMessageToChannelParams): Observable<unknown> {
        const url = this.base.createUrl(`channel/${guildId}/${channelId}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getChannelsList(filter: GetChannelListParams): Observable<PaginatedResponse<GuildChannelListItem>> {
        const url = this.base.createUrl('channel/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<GuildChannelListItem>>(url, filter, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildChannelListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeMessagesFromCache(guildId: string, channelId: string): Observable<unknown> {
        const url = this.base.createUrl(`channel/${guildId}/${channelId}/cache`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getChannelDetail(id: string): Observable<ChannelDetail> {
        const url = this.base.createUrl(`channel/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ChannelDetail>(url, { headers }).pipe(
            map(data => ChannelDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateChannel(id: string, params: UpdateChannelParams): EmptyObservable {
        const url = this.base.createUrl(`channel/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserStatsOfChannel(id: string, pagination: PaginatedParams): Observable<PaginatedResponse<ChannelUserStatItem>> {
        const url = this.base.createUrl(`channel/${id}/userStats`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<ChannelUserStatItem>>(url, pagination, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => ChannelUserStatItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
