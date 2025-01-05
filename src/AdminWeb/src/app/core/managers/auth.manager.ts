import { Injectable, inject } from "@angular/core";
import { LocalStorageService } from "@coreui/angular";
import { OAuth2LoginToken } from "../models/auth/oauth2-login-token";
import { Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtToken } from "../models/auth/jwt-token";

export const ACCESS_TOKEN_KEY = 'X-GrillBot-Storage-AccessToken';

@Injectable({ providedIn: 'root' })
export class AuthManager {
  readonly #storage = inject(LocalStorageService);
  readonly #router = inject(Router);

  private get rawToken(): string {
    return this.#storage.getItem(ACCESS_TOKEN_KEY);
  }

  private set rawToken(value: string) {
    this.#storage.setItem(ACCESS_TOKEN_KEY, value);
  }

  get token(): JwtToken {
    return new JwtToken(this.rawToken);
  }

  setToken(token: OAuth2LoginToken): boolean {
    if (token.errorMessage) {
      alert(token.errorMessage); // TODO Toast notifications
      return false;
    }

    this.rawToken = token.accessToken!;
    return true;
  }

  logout(loginPath?: string | UrlTree): void {
    this.#storage.removeItem(ACCESS_TOKEN_KEY);
    this.#router.navigateByUrl(loginPath?.toString() ?? '/login');
  }

  hasPermission(permission: string): boolean {
    return this.token.permissions.includes(permission);
  }

  hasAnyPermission(...permissions: string[]): boolean {
    return permissions.some(p => this.token.permissions.includes(p));
  }

  createLoginPath(state: RouterStateSnapshot): UrlTree {
    const loginPath = this.#router.parseUrl('/login');
    loginPath.queryParams['redirectUri'] = state.url;

    return loginPath;
  }
}
