import { EmptyObservable, ObservableList } from './../models/common';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { AutoReplyItem, AutoReplyItemParams } from '../models/auto-reply';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AutoReplyService {
    constructor(
        private base: BaseService
    ) { }

    getAutoReplyList(): ObservableList<AutoReplyItem> {
        const url = this.base.createUrl('autoreply');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<AutoReplyItem[]>(url, { headers }).pipe(
            map(data => data.map(entity => AutoReplyItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getItem(id: number): Observable<AutoReplyItem> {
        const url = this.base.createUrl(`autoreply/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<AutoReplyItem>(url, { headers }).pipe(
            map(data => AutoReplyItem.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    createItem(parameters: AutoReplyItemParams): Observable<AutoReplyItem> {
        const url = this.base.createUrl('autoreply');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<AutoReplyItem>(url, parameters, { headers }).pipe(
            map(data => AutoReplyItem.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateItem(id: number, parameters: AutoReplyItemParams): Observable<AutoReplyItem> {
        const url = this.base.createUrl(`autoreply/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put<AutoReplyItem>(url, parameters, { headers }).pipe(
            map(data => AutoReplyItem.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeItem(id: number): EmptyObservable {
        const url = this.base.createUrl(`autoreply/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
