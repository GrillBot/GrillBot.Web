import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router, RouterStateSnapshot } from "@angular/router";
import { AuthManager } from "../managers/auth.manager";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  readonly #authManager = inject(AuthManager);
  readonly #router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const loginPath = this.#router.parseUrl('/login');

    if (!this.#authManager.token.isLogged) {
      this.#authManager.logout();
      return new RedirectCommand(loginPath);
    }

    return true;
  }
}
