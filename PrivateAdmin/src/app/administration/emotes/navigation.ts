import { ActivatedRoute } from '@angular/router';
import { NavigationHelper } from 'src/app/core/lib/navigation';
import { INavigation, NavigationItem } from 'src/app/shared/navigation/navigation';

export class EmotesNavigation implements INavigation {
    constructor(private currentRoute: ActivatedRoute) { }

    getItems(): NavigationItem[] {
        return [
            new NavigationItem('/admin/emotes/supported', 'Podporované emoty'),
            new NavigationItem('/admin/emotes/unsupported', 'Nepodporované emoty')
        ];
    }

    isActive(item: NavigationItem): boolean {
        return NavigationHelper.buildPath(this.currentRoute) === item.routerLink;
    }

}
