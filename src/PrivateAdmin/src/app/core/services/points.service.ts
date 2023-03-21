import { PointsSummaryBase, UserPointsItem } from './../models/points';
import { HttpErrorResponse } from '@angular/common/http';
import { List, ObservableList, ObservablePaginatedData, PaginatedResponse, EmptyObservable } from './../models/common';
import { map, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from "@angular/core";
import { GetPointTransactionsParams, PointsTransaction } from '../models/points';

@Injectable({ providedIn: 'root' })
export class PointsService {
    constructor(private base: BaseService) { }

    getTransactionList(params: GetPointTransactionsParams): ObservablePaginatedData<PointsTransaction> {
        const url = this.base.createUrl('user/points/transactions/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<PointsTransaction>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => PointsTransaction.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getGraphData(params: GetPointTransactionsParams): ObservableList<PointsSummaryBase> {
        const url = this.base.createUrl('user/points/graph/data');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PointsSummaryBase[]>(url, params, { headers }).pipe(
            map(data => data.map((entity: PointsSummaryBase) => PointsSummaryBase.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    computeUserPoints(userId: string): ObservableList<UserPointsItem> {
        const url = this.base.createUrl(`user/points/${userId}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<UserPointsItem>>(url, { headers }).pipe(
            map(data => data.map((entity: any) => UserPointsItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    serviceIncrementPoints(guildId: string, toUserId: string, amount: number): EmptyObservable {
        const url = this.base.createUrl(`user/points/service/increment/${guildId}/${toUserId}/${amount}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, {}, { headers }).pipe(catchError((err: HttpErrorResponse) => this.base.catchError(err)))
    }

    serviceTransferPoints(guildId: string, fromUserId: string, toUserId: string, amount: number): EmptyObservable {
        const url = this.base.createUrl(`user/points/service/transfer/${guildId}/${fromUserId}/${toUserId}/${amount}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, {}, { headers }).pipe(catchError((err: HttpErrorResponse) => this.base.catchError(err)))
    }
}
