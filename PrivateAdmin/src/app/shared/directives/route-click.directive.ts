import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[route-click]'
})
export class RouteClickDirective {
    @Input() route: string;

    constructor(
        private router: Router
    ) { }

    @HostListener('click')
    clicked(): void {
        this.router.navigateByUrl(this.route);
    }
}
