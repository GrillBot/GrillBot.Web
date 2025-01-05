import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, RouterStateSnapshot } from "@angular/router";
import { AuthManager } from "../managers/auth.manager";

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
  readonly #authManager = inject(AuthManager);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const loginPath = this.#authManager.createLoginPath(state);

    if (!this.#authManager.token.isLogged) {
      this.#authManager.logout(loginPath);
      return new RedirectCommand(loginPath);
    }

    return true;
  }
}
