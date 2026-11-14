import { Injectable, inject } from "@angular/core";
import { LocalStorageService } from "@coreui/angular";
import { Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { AuthClient } from "../clients/auth.client";
import { Session } from "../models/auth/session";
import { environment } from "../../../environments/environment";

/** Where the access token used to be kept, before sign-in moved to a server-side session. */
const LEGACY_ACCESS_TOKEN_KEY = 'X-GrillBot-Storage-AccessToken';

@Injectable({ providedIn: 'root' })
export class AuthManager {
  readonly #authClient = inject(AuthClient);
  readonly #storage = inject(LocalStorageService);
  readonly #router = inject(Router);

  #session = new Session(null);

  get session(): Session {
    return this.#session;
  }

  /** Loads the signed-in user. Runs once on startup, before the first navigation. */
  loadSession(): Observable<Session> {
    // Tokens no longer live in the browser; drop one left behind by an older version.
    this.#storage.removeItem(LEGACY_ACCESS_TOKEN_KEY);

    return this.#authClient.getSession().pipe(
      map(info => this.#session = new Session(info ?? null)),
      catchError(() => of(this.#session = new Session(null)))
    );
  }

  /** Leaves for Discord; the bot creates the session and redirects back to `returnUrl`. */
  startLogin(returnUrl?: string): void {
    location.href = `${environment.sessionLoginUri}?returnUrl=${encodeURIComponent(returnUrl || '/')}`;
  }

  logout(loginPath?: string | UrlTree): void {
    const wasLogged = this.#session.isLogged;
    this.#session = new Session(null);

    if (wasLogged) {
      this.#authClient.logout().subscribe({ error: () => { /* the session is gone either way */ } });
    }

    this.#router.navigateByUrl(loginPath?.toString() ?? '/login');
  }

  hasPermission(permission: string): boolean {
    return this.session.permissions.includes(permission);
  }

  hasAnyPermission(...permissions: string[]): boolean {
    return permissions.some(p => this.session.permissions.includes(p));
  }

  createLoginPath(state: RouterStateSnapshot): UrlTree {
    const loginPath = this.#router.parseUrl('/login');
    loginPath.queryParams['redirectUri'] = state.url;

    return loginPath;
  }
}
