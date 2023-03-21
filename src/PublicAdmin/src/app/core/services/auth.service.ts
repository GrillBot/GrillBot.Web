import { QueryParam } from './../models/http';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { AuthToken, OAuth2Link } from '../models/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private storage: StorageService,
        private router: Router,
        private base: BaseService,
        private userService: UserService
    ) { }

    get currentToken(): AuthToken {
        return AuthToken.create(this.storage.read<any>('GrillBot_Public_AuthData'));
    }

    get isLogged(): boolean {
        const token = this.currentToken;
        if (!token) { return false; }
        return !token.isExpired;
    }

    logout(): void {
        if (this.isLogged) {
            this.userService.hearthbeatOff().subscribe();
            this.storage.remove('GrillBot_Public_AuthData');
        }

        this.router.navigateByUrl('/login');
    }

    getLink(): Observable<OAuth2Link> {
        const url = this.base.createUrl('auth/link', [new QueryParam('isPublic', true)]);
        return this.base.http.get<any>(url).pipe(map(data => OAuth2Link.create(data)));
    }

    processLogin(sessionId: string, isPublic: boolean): Observable<AuthToken> {
        const parameters = [
            new QueryParam('sessionId', sessionId),
            new QueryParam('isPublic', isPublic)
        ];

        const url = this.base.createUrl('auth/token', parameters);
        return this.base.http.get<any>(url).pipe(map(data => AuthToken.create(data)),);
    }
}
