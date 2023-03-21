import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { EMPTY } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    errorMessage: string;
    loading = false;

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
                    this.storage.store('AuthData', result.serialize());
                    this.router.navigate(['/admin']);
                }
            });
        }
    }

    startSession(): void {
        this.loading = true;
        this.errorMessage = null;

        this.authService.getLink().pipe(catchError(_ => {
            this.loading = false;
            this.errorMessage = 'Nepodařilo se připojit na server.';

            return EMPTY;
        })).subscribe(url => location.href = url.url);
    }

}
