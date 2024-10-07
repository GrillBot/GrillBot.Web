import { Injectable, inject } from "@angular/core";
import { AuthManager } from "./auth.manager";
import { INavData } from "@coreui/angular";

const checkPermissions = (currentPerms: string[], requiredPerms: string[]): boolean =>
  currentPerms.some(p => requiredPerms.includes(p));

const createMenuItem = (name: string, url: string, icon: string, requiredPerms: string[], children: INavData[] = []): INavData => {
  return {
    name,
    url,
    iconComponent: {
      name: icon
    },
    attributes: {
      checkPermissions: (perms: string[]) => checkPermissions(perms, requiredPerms)
    },
    children
  };
};

const createChildMenuItem = (name: string, url: string, requiredPerms: string[]): INavData => {
  return {
    name,
    url,
    attributes: {
      checkPermissions: (perms: string[]) => checkPermissions(perms, requiredPerms)
    }
  };
};

@Injectable({ providedIn: 'root' })
export class NavManager {
  readonly #authManager = inject(AuthManager);

  readonly #items: INavData[] = [
    createMenuItem(
      'Dashboard',
      '/web/dashboard',
      'cil-featured-playlist',
      ['Dashboard(Admin)', 'UserMeasures(Admin)'],
      [
        createChildMenuItem('Bot', '/web/dashboard/common', ['Dashboard(Admin)', 'UserMeasures(Admin)']),
        createChildMenuItem('Služby', '/web/dashboard/services', ['Dashboard(Admin)']),
        createChildMenuItem('API', '/web/dashboard/api', ['Dashboard(Admin)', 'AuditLog(Admin)'])
      ]
    ),
    createMenuItem(
      'Body',
      '/web/points',
      'cil-chat-bubble',
      ['Points(Leaderboard)', 'Points(Admin)'],
      [
        createChildMenuItem('Leaderboard', '/web/points/leaderboard', ['Points(Leaderboard)']),
        //createChildMenuItem('Transakce', '/web/points/transactions', ['Points(Admin)']),
        //createChildMenuItem('Uživatelé', '/web/points/users', ['Points(Admin)'])
      ]
    )
  ];

  createSidebarMenu(): INavData[] {
    return this.#items
      .map(item => this.recursivelyProcessMenu(item))
      .filter(item => !!item)
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
