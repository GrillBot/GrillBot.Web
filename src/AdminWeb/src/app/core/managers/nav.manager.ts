import { Injectable, inject } from "@angular/core";
import { AuthManager } from "./auth.manager";
import { INavData } from "@coreui/angular";
import { IChildMenuItem, IMenuItem } from "../models/menu";
import menu from '../../menu.json';

const checkPermissions = (currentPerms: string[], requiredPerms: string[]): boolean =>
  currentPerms.some(p => requiredPerms.includes(p));

@Injectable({ providedIn: 'root' })
export class NavManager {
  readonly #authManager = inject(AuthManager);

  createSidebarMenu(): INavData[] {
    const menuItems: IMenuItem[] = menu;

    return menuItems
      .map(item => this.createMenuItem(item))
      .map(item => this.recursivelyProcessMenu(item))
      .filter(item => !!item);
  }

  private createMenuItem(item: IMenuItem): INavData | null {
    return {
      name: item.name,
      url: item.url,
      iconComponent: {
        name: item.icon
      },
      attributes: {
        checkPermissions: (perms: string[]) => checkPermissions(perms, item.permissions)
      },
      children: item.childItems.map(item => this.createChildMenuItem(item))
    };
  }

  private createChildMenuItem(item: IChildMenuItem): INavData {
    return {
      name: item.name,
      url: item.url,
      attributes: {
        checkPermissions: (perms: string[]) => checkPermissions(perms, item.permissions)
      }
    }
  }

  recursivelyProcessMenu(item: INavData | null): INavData | null {
    if (!item) {
      return null;
    }

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
