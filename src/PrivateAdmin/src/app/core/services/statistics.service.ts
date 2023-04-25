import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Dictionary, ObservableDict, ObservableList } from '../models/common';
import {
    ApiStatistics, AuditLogStatistics, AvgExecutionTimes,
    DatabaseStatistics, OperationStats, StatisticItem, UserActionCountItem
} from '../models/statistics';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/http';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
    constructor(private base: BaseService) { }

    getDbStatus(): Observable<DatabaseStatistics> {
        const url = this.base.createUrl('stats/db');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<DatabaseStatistics>(url, { headers }).pipe(
            map(data => DatabaseStatistics.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getAuditLogStatistics(): Observable<AuditLogStatistics> {
        const url = this.base.createUrl('stats/audit-log');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<AuditLogStatistics>(url, { headers }).pipe(
            map(data => AuditLogStatistics.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getInteractionsStatus(): ObservableList<StatisticItem> {
        return this.getObjectStatistics('stats/interactions');
    }

    getUnverifyLogsStatisticsByOperation(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/unverify-logs/type');
    }

    getUnverifyLogsStatisticsByDate(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/unverify-logs/date');
    }

    getEventStatistics(): ObservableDict<string, number> {
        return this.getDictionaryStatistics('stats/events');
    }

    getAvgTimes(): Observable<AvgExecutionTimes> {
        const url = this.base.createUrl('stats/avg-times');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<AvgExecutionTimes>(url, { headers }).pipe(
            map(data => AvgExecutionTimes.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getOperationStatistics(): Observable<OperationStats> {
        const url = this.base.createUrl('stats/operations');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<OperationStats>(url, { headers }).pipe(
            map(data => OperationStats.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getApiStatistics(): Observable<ApiStatistics> {
        const url = this.base.createUrl('stats/api');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ApiStatistics>(url, { headers }).pipe(
            map(data => ApiStatistics.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserCommandStatistics(): ObservableList<UserActionCountItem> {
        const url = this.base.createUrl('stats/interactions/users');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UserActionCountItem[]>(url, { headers }).pipe(
            map(data => data.map(o => UserActionCountItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUserApiStatistics(criteria: string): ObservableList<UserActionCountItem> {
        const url = this.base.createUrl('stats/api/users', [new QueryParam('criteria', criteria)]);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UserActionCountItem[]>(url, { headers }).pipe(
            map(data => data.map(o => UserActionCountItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    private getDictionaryStatistics(urlPart: string): ObservableDict<string, number> {
        const url = this.base.createUrl(urlPart);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, number>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] as number }))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    private getObjectStatistics(urlPart: string): ObservableList<StatisticItem> {
        const url = this.base.createUrl(urlPart);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<StatisticItem[]>(url, { headers }).pipe(
            map(data => data.map(o => StatisticItem.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
