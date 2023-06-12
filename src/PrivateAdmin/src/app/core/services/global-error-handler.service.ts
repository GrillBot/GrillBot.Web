/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { ClientLogItemRequest } from './../models/audit-log';
import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, EMPTY } from 'rxjs';
import { AuthToken } from '../models/auth';
import { HTTPHeaders } from '../models/http';
import { StorageService } from './storage.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private http: HttpClient,
        private storage: StorageService
    ) { }

    handleError(error: Error): void {
        const errorMessage = this.getErrorMessage(error);
        const item = new ClientLogItemRequest(false, false, true, errorMessage, 'PrivateAdmin', 'GlobalErrorHandler');

        this.handleLogItem(item);
        console.error(error);
    }

    handleLogItem(item: ClientLogItemRequest): void {
        const url = `${environment.apiUrl}/auditlog/client`;
        const headers = this.getHttpHeaders();

        this.http.post<unknown>(url, item, { headers }).pipe(catchError(_ => EMPTY)).subscribe();
    }

    getHttpHeaders(): HTTPHeaders {
        const auth = AuthToken.create(this.storage.read<any>('AuthData'));
        return { Authorization: `Bearer ${auth.accessToken}` };
    }

    getErrorMessage(error: Error): string {
        if (error.stack) {
            return error.stack;
        }

        if (error.constructor.name === 'Error') {
            return error.toString();
        }

        return JSON.stringify(error);
    }
}
