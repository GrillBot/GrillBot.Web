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
        permissions: ['Dashboard(Admin)']
      },
      iconComponent: {
        name: 'cil-featured-playlist'
      },
      children: [
        {
          name: 'Bot',
          url: '/web/dashboard',
          attributes: {
            permissions: ['Dashboard(Admin)']
          }
        },
        {
          name: 'Služby',
          url: '/web/dashboard/services',
          attributes: {
            permissions: ['Dashboard(Admin)']
          }
        },
        {
          name: 'API',
          url: '/web/dashboard/api',
          attributes: {
            permissions: ['Dashboard(Admin)', 'AuditLog(Admin)']
          }
        }
      ]
    }
  ];

  createSidebarMenu(): INavData[] {
    const result: INavData[] = [];

    for (const item of this.#items) {
      const menu = this.recursivelyProcessMenu(item);
      if (menu) {
        result.push(menu);
      }
    }

    return result;
  }

  recursivelyProcessMenu(item: INavData): INavData | null {
    const permissions = item.attributes!['permissions'] as string[];
    if (permissions.length > 0 && !permissions.every(p => this.#authManager.hasPermission(p))) {
      return null;
    }

    const copy = JSON.parse(JSON.stringify(item));
    if (!item.children || item.children.length === 0) {
      return copy;
    }

    copy.children = [];
    for (const childItem of item.children) {
      const childMenu = this.recursivelyProcessMenu(childItem);
      if (childMenu) {
        copy.children.push(childMenu);
      }
    }

    return copy;
  }
}
