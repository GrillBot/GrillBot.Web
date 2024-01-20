import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/core/lib/navigation';
import { INavigation, NavigationItem } from 'src/app/shared/navigation/navigation';

export class UserMeasuresNavigation implements INavigation {
    constructor(private currentRoute: ActivatedRoute) { }

    getItems(): NavigationItem[] {
        return [
            new NavigationItem('/admin/userMeasures', 'Seznam opatření'),
            new NavigationItem('/admin/userMeasures/createWarning', 'Zapsat varování')
        ];
    }

    isActive(item: NavigationItem): boolean {
        const currentPath = NavigationHelper.buildPath(this.currentRoute);
        return currentPath === item.routerLink;
    }
}
