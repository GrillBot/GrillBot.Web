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
        checkPermissions: (perms: string[]) =>
          perms.includes('Dashboard(Admin)') || perms.includes('UserMeasures(Admin)')
      },
      iconComponent: {
        name: 'cil-featured-playlist'
      },
      children: [
        {
          name: 'Bot',
          url: '/web/dashboard/common',
          attributes: {
            checkPermissions: (perms: string[]) =>
              perms.includes('Dashboard(Admin)') || perms.includes('UserMeasures(Admin)')
          }
        },
        {
          name: 'Služby',
          url: '/web/dashboard/services',
          attributes: {
            checkPermissions: (perms: string[]) => perms.includes('Dashboard(Admin)')
          }
        },
        {
          name: 'API',
          url: '/web/dashboard/api',
          attributes: {
            checkPermissions: (perms: string[]) => perms.includes('Dashboard(Admin)') && perms.includes('AuditLog(Admin)')
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
    const checkPermissions: (perms: string[]) => boolean | undefined = item.attributes!["checkPermissions"];
    if (checkPermissions && !checkPermissions(this.#authManager.token.permissions)) {
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
