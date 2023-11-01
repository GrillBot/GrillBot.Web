import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/users';
import { RouteClickDirective } from './route-click.directive';
import { Router } from '@angular/router';

@Directive({
    selector: 'a[user-link]'
})
export class UserLinkDirective extends RouteClickDirective implements OnInit {
    @Input() userEntity: any;

    constructor(
        private element: ElementRef<HTMLAnchorElement>,
        router: Router
    ) { super(router); }

    private get user(): User {
        return this.userEntity instanceof User ? this.userEntity : User.create(this.userEntity);
    }

    ngOnInit(): void {
        this.route = `/admin/users/${this.user.id}`;

        this.element.nativeElement.classList.add('text-dark');
        this.element.nativeElement.innerHTML = this.user.displayName;
        this.element.nativeElement.classList.add('cursor-ptr');
        this.element.nativeElement.setAttribute('ignore-modal-click-prevention', 'true');
    }
}
