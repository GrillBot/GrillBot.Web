import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    errorMessage: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        if (this.authService.isLogged) {
            this.router.navigate(['/admin']);
            return;
        }

        const search = new URLSearchParams(location.search);
        if (search.has('sessionId')) {
            const isPublic = search.get('isPublic').toLowerCase() === 'true';

            this.authService.processLogin(search.get('sessionId'), isPublic).subscribe(result => {
                this.errorMessage = result.errorMessage;

                if (!this.errorMessage) {
                    this.storage.store('GrillBot_Public_AuthData', result.serialize());
                    this.router.navigate(['/admin']);
                }
            });
        }
    }

    startSession(): void {
        this.authService.getLink().subscribe(url => location.href = url.url);
    }

}
