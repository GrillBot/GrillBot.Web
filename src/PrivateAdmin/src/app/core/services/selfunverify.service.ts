import { ObservableDict, EmptyObservable } from './../models/common';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { KeepableParams } from '../models/selfunverify';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/http';

@Injectable({ providedIn: 'root' })
export class SelfUnverifyService {
    constructor(
        private base: BaseService
    ) { }

    getKeepables(): ObservableDict<string, string[]> {
        const url = this.base.createUrl('selfunverify/keep');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<any[]>(url, { headers }).pipe(
            map(data => Object.keys(data).map(o => ({ key: o, value: data[o] }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    addKeepable(parameters: KeepableParams[]): EmptyObservable {
        const url = this.base.createUrl('selfunverify/keep');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<unknown>(url, parameters, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    keepableExists(parameters: KeepableParams): Observable<boolean> {
        const url = this.base.createUrl('selfunverify/keep/exist', parameters.queryParams);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<boolean>(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeKeepable(group: string, name: string = null): EmptyObservable {
        const parameters = [
            new QueryParam('group', group),
            name ? new QueryParam('name', name) : null
        ].filter(o => o);
        const url = this.base.createUrl('selfunverify/keep', parameters);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        )
    }
}
