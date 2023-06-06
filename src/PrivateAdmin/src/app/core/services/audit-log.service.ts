/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedResponse } from './../models/common';
import { AuditLogListItem } from './../models/audit-log';
import { Injectable } from '@angular/core';
import { AuditLogListParams } from '../models/audit-log';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
    constructor(
        private base: BaseService
    ) { }

    removeItem(id: number): Observable<unknown> {
        const url = this.base.createUrl(`auditlog/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogList(filter: AuditLogListParams): Observable<PaginatedResponse<AuditLogListItem>> {
        const url = this.base.createUrl('auditlog/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<AuditLogListItem>>(url, filter, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => AuditLogListItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
