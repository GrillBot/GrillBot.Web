import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/users';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private base: BaseService
    ) { }

    getUserDetail(): Observable<UserDetail> {
        const url = this.base.createUrl('user/me');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UserDetail>(url, { headers }).pipe(
            map(data => UserDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    hearthbeatOff(): Observable<unknown> {
        const url = this.base.createUrl('user/hearthbeat');
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err, true))
        );
    }
}
