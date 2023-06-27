import { ObservableList } from './../models/common';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QueryParam } from '../models/http';
import { ServiceInfo } from '../models/services/services';

@Injectable({ providedIn: 'root' })
export class SystemService {
    constructor(
        private base: BaseService
    ) { }

    setBotState(isActive: boolean): Observable<unknown> {
        const url = this.base.createUrl('system/status', [new QueryParam('isActive', isActive)]);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getEventLog(): ObservableList<string> {
        const url = this.base.createUrl('system/eventLog');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<string[]>(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getServiceInfo(id: string): Observable<ServiceInfo> {
        const url = this.base.createUrl(`system/service/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ServiceInfo>(url, { headers }).pipe(
            map((o: ServiceInfo) => ServiceInfo.create(o)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
