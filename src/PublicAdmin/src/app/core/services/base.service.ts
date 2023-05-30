import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { HTTPHeaders, QueryParam } from '../models/http';
import { AuthToken } from '../models/auth';
import { Support } from '../lib/support';
import { ModalBoxService } from 'src/app/shared/modal-box/modal-box.service';
import { InfoModal } from 'src/app/shared/modal-box/models';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(
        public router: Router,
        public storage: StorageService,
        public http: HttpClient,
        private modalBox: ModalBoxService
    ) { }

    catchError(err: HttpErrorResponse, suppressModal: boolean = false): Observable<never> {
        if (err.status === HttpStatusCode.BadRequest && err.error?.errors) {
            const errors = err.error.errors as { [s: string]: string };
            const errorList = Support.flattern<string>(Object.values(errors) as string[]) as string[];

            this.modalBox.show(new InfoModal('Chybně zadané parametry', this.createValidationErrHtml(errorList), true));
            return EMPTY;
        } else if (err.status === HttpStatusCode.Unauthorized) {
            this.storage.remove('GrillBot_Public_AuthData');
            this.router.navigate(['/', 'login']).then().catch();
            return EMPTY;
        } else if (err.status !== HttpStatusCode.Ok) {
            let message = 'Při vykonání požadavku došlo k neočekávané chybě.<br>';

            if (err.status > 0) {
                if (err.error.message) {
                    message += `<p>${err.error.message as string}</p>`;
                }
            } else {
                message += `<p>${err.message}</p>`;
            }

            if (!suppressModal) {
                this.modalBox.show(new InfoModal('Chyba požadavku', message, true));
            }
        }

        return throwError(err);
    }

    isAuthError(err: HttpErrorResponse): boolean {
        if (err.status === HttpStatusCode.Unauthorized) {
            this.storage.remove('GrillBot_Public_AuthData');
            this.router.navigate(['/login']);
            return true;
        }

        return false;
    }

    getHttpHeaders(): HTTPHeaders {
        const auth = AuthToken.create(this.storage.read<any>('GrillBot_Public_AuthData'));

        // eslint-disable-next-line @typescript-eslint/naming-convention
        return { Authorization: `Bearer ${auth.accessToken}` };
    }

    createUrl(endpoint: string, queryParams: QueryParam[] = null): string {
        let url = environment.apiUrl + `/${endpoint}`;
        if (queryParams && queryParams.length > 0) {
            const parameters = queryParams.map(o => o.toString()).join('&');
            url += `?${parameters}`;
        }

        return url;
    }

    private createValidationErrHtml(errors: string[]): string {
        return [
            '<ul class="mb-0">',
            ...errors.map(e => `<li>${e}</li>`),
            '</ul>'
        ].join('');
    }
}
