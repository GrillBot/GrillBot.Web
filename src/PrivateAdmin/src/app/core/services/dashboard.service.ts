import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Dictionary, List, ObservableDict, ObservableList } from '../models/common';
import { DashboardInfoRow, TodayAvgTimes } from '../models/services/services';
import { DashboardInfo } from '../models/system';
import { BaseService } from './base.service';
import * as models from '../models/system';
import { Support } from '../lib/support';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private base: BaseService) { }

    getApiDashboard(apiGroup: string): ObservableList<DashboardInfoRow> {
        const url = this.base.createUrl(`dashboard/api/${apiGroup}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<DashboardInfoRow>>(url, { headers }).pipe(
            map(data => data.map(entity => DashboardInfoRow.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getInteractionsDashboard(): ObservableList<DashboardInfoRow> {
        const url = this.base.createUrl('dashboard/interactions');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<DashboardInfoRow>>(url, { headers }).pipe(
            map(data => data.map(entity => DashboardInfoRow.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getJobsDashboard(): ObservableList<DashboardInfoRow> {
        const url = this.base.createUrl('dashboard/jobs');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<DashboardInfoRow>>(url, { headers }).pipe(
            map(data => data.map(entity => DashboardInfoRow.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getTodayAvgTimes(): Observable<TodayAvgTimes> {
        const url = this.base.createUrl('dashboard/todayAvgTimes');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<TodayAvgTimes>(url, { headers }).pipe(
            map(data => TodayAvgTimes.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getCommonInfo(): Observable<DashboardInfo> {
        const url = this.base.createUrl('dashboard/common');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<DashboardInfo>(url, { headers }).pipe(
            map(data => DashboardInfo.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getServicesList(): ObservableList<models.DashboardService> {
        const url = this.base.createUrl('dashboard/services');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<models.DashboardService>>(url, { headers }).pipe(
            map(data => data.map(entity => models.DashboardService.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getActiveOperations(): ObservableDict<string, number> {
        const url = this.base.createUrl('dashboard/operations/active');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Support.createDictFromObj(data, value => parseInt(value, 10))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getOperationStats(): ObservableList<models.CounterStats> {
        const url = this.base.createUrl('dashboard/operations');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<models.CounterStats>>(url, { headers }).pipe(
            map(data => data.map(entity => models.CounterStats.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserMeasuresDashboard(): ObservableList<DashboardInfoRow> {
        const url = this.base.createUrl('dashboard/nonCompliantMeasures');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<DashboardInfoRow>>(url, { headers }).pipe(
            map(data => data.map(entity => DashboardInfoRow.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
