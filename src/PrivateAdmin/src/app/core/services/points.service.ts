import { UserPointsItem } from './../models/points';
import { HttpErrorResponse } from '@angular/common/http';
import { List, ObservableList, EmptyObservable } from './../models/common';
import { map, catchError } from 'rxjs';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PointsService {
    constructor(private base: BaseService) { }

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

        return this.base.http.put(url, {}, { headers }).pipe(catchError((err: HttpErrorResponse) => this.base.catchError(err)));
    }
}
