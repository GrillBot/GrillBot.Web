import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable, catchError } from "rxjs";
import { OAuth2LoginToken } from "../models/auth/oauth2-login-token";

@Injectable({ providedIn: 'root' })
export class AuthClient extends BaseClient {
  constructor() {
    super();
  }

  retrieveJwtToken(): Observable<OAuth2LoginToken> {
    const url = this.createUrl('auth/oauth2/jwt');

    return this.httpClient.get<OAuth2LoginToken>(url, this.requestHeaders).pipe(
      catchError(err => this.catchError(err))
    );
  }
}
