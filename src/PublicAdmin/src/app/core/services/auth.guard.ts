import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
    constructor(
        private authService: AuthService
    ) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isLogged) {
            this.authService.logout();
            return false;
        }

        return true;
    }
}
