import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map, Observable } from 'rxjs';
import { EmoteSuggestion, GetSuggestionListParams } from 'src/app/core/models/suggestions';
import { PaginatedResponse } from '../models/common';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmoteSuggestionService {
    constructor(
        private base: BaseService
    ) { }

    getSuggestionList(params: GetSuggestionListParams): Observable<PaginatedResponse<EmoteSuggestion>> {
        const url = this.base.createUrl('emotes/suggestion/list');
        const headers = this.base.getHttpHeaders();

        return this.base.http.post<PaginatedResponse<EmoteSuggestion>>(url, params, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => EmoteSuggestion.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
