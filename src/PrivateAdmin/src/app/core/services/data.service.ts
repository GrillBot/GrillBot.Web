import { QueryParam } from './../models/http';
import { Dictionary, ObservableDict } from './../models/common';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
        private base: BaseService
    ) { }

    getGuilds(): ObservableDict<string, string> {
        const url = this.base.createUrl('data/guilds');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getChannels(guildId?: string, ignoreThreads: boolean = false): ObservableDict<string, string> {
        const parameters: QueryParam[] = [];
        if (guildId) { parameters.push(new QueryParam('guildId', guildId)); }
        if (ignoreThreads) { parameters.push(new QueryParam('ignoreThreads', ignoreThreads)); }
        const url = this.base.createUrl('data/channels', parameters);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getRoles(guildId?: string): ObservableDict<string, string> {
        const url = this.base.createUrl('data/roles', [guildId ? new QueryParam('guildId', guildId) : null].filter(o => o));
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUsersList(bots?: boolean, guildId?: string): ObservableDict<string, string> {
        const parameters: QueryParam[] = [];
        if (bots !== undefined) { parameters.push(new QueryParam('bots', bots)); }
        if (guildId) { parameters.push(new QueryParam('guildId', guildId)); }

        const url = this.base.createUrl('data/users', parameters);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as string }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getPublicApiMethods(): ObservableDict<string, string> {
        const url = this.base.createUrl('data/publicApi/methods');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<string[]>(url, { headers }).pipe(
            map(data => data.map(k => ({ key: k, value: k }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
