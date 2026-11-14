import { Injectable } from "@angular/core";
import { BaseClient } from "./base.client";
import { Observable } from "rxjs";
import { SessionInfo } from "../models/auth/session";

@Injectable({ providedIn: 'root' })
export class AuthClient extends BaseClient {
  /** The signed-in user, or `null` (204) when there is no session. */
  getSession(): Observable<SessionInfo | null> {
    const url = this.createUrl('session/me');
    return this.httpClient.get<SessionInfo | null>(url, this.requestHeaders);
  }

  logout(): Observable<unknown> {
    const url = this.createUrl('session/logout');
    return this.httpClient.post(url, null, this.requestHeaders);
  }
}
