import { HttpClient } from '@angular/common/http';
import { ClientLogItemRequest } from './../models/audit-log';
import { ErrorHandler, Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { EmptyObservable } from '../models/common';
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
        const item = new ClientLogItemRequest(false, false, true, error.stack ? error.stack : error.toString());

        this.handleLogItem(item).subscribe();
        console.error(error);
    }

    handleLogItem(item: ClientLogItemRequest): EmptyObservable {
        const url = `${environment.apiUrl}/auditlog/client`;
        const headers = this.getHttpHeaders();

        return this.http.post<unknown>(url, item, { headers })
            .pipe(catchError(_ => EMPTY));
    }

    getHttpHeaders(): HTTPHeaders {
        const auth = AuthToken.create(this.storage.read<any>('AuthData'));

        return { Authorization: `Bearer ${auth.accessToken}` };
    }
}
