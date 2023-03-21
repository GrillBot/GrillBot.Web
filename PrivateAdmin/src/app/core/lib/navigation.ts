import { ActivatedRoute } from '@angular/router';

export class NavigationHelper {
    static buildPath(route: ActivatedRoute): string {
        const parts = route.snapshot.pathFromRoot
            .filter(o => o.routeConfig?.path && o.routeConfig.path.length > 0)
            .map(o => o.routeConfig.path);

        return `/${parts.join('/')}`;
    }
}
