import { ApiClientParams } from './../models/api-clients';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiClient } from '../models/api-clients';
import { EmptyObservable, List, ObservableList } from '../models/common';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ApiClientsService {
    constructor(private base: BaseService) { }

    getClientsList(): ObservableList<ApiClient> {
        const url = this.base.createUrl('publicApiClients');
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<List<ApiClient>>(url, { headers }).pipe(
            map(data => data.map(o => ApiClient.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    createClient(parameters: ApiClientParams): EmptyObservable {
        const url = this.base.createUrl('publicApiClients');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, parameters, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    updateClient(clientId: string, parameters: ApiClientParams): EmptyObservable {
        const url = this.base.createUrl(`publicApiClients/${clientId}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, parameters, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    deleteClient(clientId: string): EmptyObservable {
        const url = this.base.createUrl(`publicApiClients/${clientId}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getClient(clientId: string): Observable<ApiClient> {
        const url = this.base.createUrl(`publicApiClients/${clientId}`);
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ApiClient>(url, { headers }).pipe(
            map(data => ApiClient.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err, err.status === 404))
        );
    }
}
