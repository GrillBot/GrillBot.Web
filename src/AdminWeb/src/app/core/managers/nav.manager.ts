import { Injectable, inject } from "@angular/core";
import { AuthManager } from "./auth.manager";
import { INavData } from "@coreui/angular";

@Injectable({ providedIn: 'root' })
export class NavManager {
  readonly #authManager = inject(AuthManager);

  readonly #items: INavData[] = [
    {
      name: 'Dashboard',
      url: '/web/dashboard',
      attributes: {
        permission: 'Dashboard(Admin)'
      },
      iconComponent: {
        name: 'cil-featured-playlist'
      }
    }
  ];

  createSidebarMenu(): INavData[] {
    const currentPermissions = this.#authManager.token.permissions;

    return this.#items
      .filter(item => currentPermissions.includes(item.attributes!['permission']))
      .map(item => Object.assign({}, item));
  }
}
