/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpErrorResponse } from '@angular/common/http';
import { ObservablePaginatedData, PaginatedResponse } from './../models/common';
import { LogListItem, SearchRequest } from './../models/audit-log';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
    constructor(
        private base: BaseService
    ) { }

    removeItem(id: string): Observable<unknown> {
        const url = this.base.createUrl(`auditlog/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    searchAuditLogs(request: SearchRequest): ObservablePaginatedData<LogListItem> {
        const url = this.base.createUrl('auditlog/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<LogListItem>>(url, request, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => LogListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
