import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AuditLogStatusInfo, PointsServiceStatusInfo, ServiceInfo } from '../models/services/services';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ServiceService {
    constructor(
        private base: BaseService
    ) { }

    getServiceInfo(id: string): Observable<ServiceInfo> {
        const url = this.base.createUrl(`service/${id}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ServiceInfo>(url, { headers }).pipe(
            map((o: ServiceInfo) => ServiceInfo.create(o)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogStatusInfo(): Observable<AuditLogStatusInfo> {
        const url = this.base.createUrl('service/auditLog/status');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<AuditLogStatusInfo>(url, { headers }).pipe(
            map(o => AuditLogStatusInfo.create(o)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getPointsServiceStatusInfo(): Observable<PointsServiceStatusInfo> {
        const url = this.base.createUrl('service/points/status');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PointsServiceStatusInfo>(url, { headers }).pipe(
            map(o => PointsServiceStatusInfo.create(o)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
