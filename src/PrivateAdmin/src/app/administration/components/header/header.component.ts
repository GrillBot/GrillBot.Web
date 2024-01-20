import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        public authService: AuthService
    ) { }

    logout(): void {
        this.authService.logout();
    }

    toggleMenu(): void {
        const cssClass = 'sb-sidenav-toggled';
        document.body.classList.toggle(cssClass);
    }
}
