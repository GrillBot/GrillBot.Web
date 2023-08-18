import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    errorMessage: string;
    loadingState: 'connect' | 'redirect' | 'login' | null = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.loadingState = null;

        if (this.authService.isLogged) {
            this.router.navigate(['/admin']);
            return;
        }

        const search = new URLSearchParams(location.search);
        if (search.has('sessionId')) {
            const isPublic = search.get('isPublic').toLowerCase() === 'true';

            this.loadingState = 'login';
            this.authService.processLogin(search.get('sessionId'), isPublic).subscribe(result => {
                this.errorMessage = result.errorMessage;
                this.loadingState = null;

                if (!this.errorMessage) {
                    this.storage.store('GrillBot_Public_AuthData', result.serialize());
                    this.router.navigate(['/admin']);
                }
            });
        } else if (search.has('auto') && search.get('auto') === 'true') {
            this.startSession();
            return;
        }
    }

    startSession(): void {
        this.loadingState = 'connect';
        this.errorMessage = null;

        this.authService.getLink().pipe(catchError(_ => {
            this.errorMessage = 'Nepodařilo se připojit na server.';
            this.loadingState = null;

            return EMPTY;
        })).subscribe(url => {
            this.loadingState = 'redirect';
            location.href = url.url;
        });
    }

}
