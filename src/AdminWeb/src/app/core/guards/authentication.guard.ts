import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, GuardResult, MaybeAsync, RedirectCommand, Router, RouterStateSnapshot } from "@angular/router";
import { AuthManager } from "../managers/auth.manager";

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivateChild {
  readonly #authManager = inject(AuthManager);
  readonly #router = inject(Router);

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const canActivate: (permissions: string[]) => boolean | undefined = childRoute.data['canActivate'];
    const currentPermissions = this.#authManager.token.permissions;

    if (canActivate && !canActivate(currentPermissions)) {
      const redirectUri = this.#router.parseUrl(`/web/users/${this.#authManager.token.id}`);
      return new RedirectCommand(redirectUri);
    }

    return true;
  }
}
