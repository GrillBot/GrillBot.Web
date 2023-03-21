import { filter } from 'rxjs/operators';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
    activeRoute: string;

    constructor(
        public router: Router,
        public authService: AuthService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activeRoute = this.route.snapshot.firstChild.data.id as string;

        this.router.events
            .pipe(filter(o => o instanceof NavigationEnd))
            .subscribe((_: NavigationEnd) => this.activeRoute = this.route.snapshot.firstChild.data.id as string);
    }
}
