import { HttpErrorResponse } from '@angular/common/http';
import { ObservableList } from './../models/common';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { ChannelboardItem } from '../models/channels';

/* eslint-disable @typescript-eslint/indent */
@Injectable({ providedIn: 'root' })
export class ChannelService {
    constructor(
        private base: BaseService
    ) { }

    getChannelboard(): ObservableList<ChannelboardItem> {
        const url = this.base.createUrl('channel/board');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ChannelboardItem[]>(url, { headers }).pipe(
            map(data => data.map(o => ChannelboardItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
