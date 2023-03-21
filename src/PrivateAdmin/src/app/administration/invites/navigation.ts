import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/core/lib/navigation';
import { INavigation, NavigationItem } from './../../shared/navigation/navigation';

export class InviteNavigation implements INavigation {
    constructor(private currentRoute: ActivatedRoute) { }

    getItems(): NavigationItem[] {
        return [
            new NavigationItem('/admin/invites', 'Seznam pozvánek'),
            new NavigationItem('/admin/invites/service', 'Servisní operace')
        ];
    }

    isActive(item: NavigationItem): boolean {
        const currentPath = NavigationHelper.buildPath(this.currentRoute);
        return currentPath === item.routerLink;
    }
}
