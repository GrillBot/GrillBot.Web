import { Component, OnInit, inject, viewChild } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import {
  SidebarComponent, SidebarHeaderComponent, SidebarBrandComponent, SidebarNavComponent,
  SidebarFooterComponent, SidebarToggleDirective, SidebarTogglerDirective,
  ShadowOnScrollDirective, ContainerComponent, INavData, BadgeComponent,
  ToasterComponent
} from "@coreui/angular";
import { DefaultFooterComponent } from "./default-footer/default-footer.component";
import { DefaultHeaderComponent } from "./default-header/default-header.component";
import { NgScrollbar } from 'ngx-scrollbar';
import { NavManager } from "../../core/managers/nav.manager";
import { DashboardClient } from "../../core/clients/dashboard.client";
import { Observable, filter, map } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { DashboardInfo } from "../../core/models/dashboard/dashboard-info";
import { NotificationsManager } from "../../core/managers/notifications.manager";
import { NotificationToastComponent } from "../../components/notification-toast/notification-toast.component";

const isOverflown = (element: HTMLElement) => {
  return (element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  standalone: true,
  imports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    RouterLink,
    NgScrollbar,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    DefaultHeaderComponent,
    ShadowOnScrollDirective,
    ContainerComponent,
    RouterOutlet,
    DefaultFooterComponent,
    BadgeComponent,
    AsyncPipe,
    ToasterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #navManager = inject(NavManager);
  readonly #dashboardClient = inject(DashboardClient);
  readonly #notificationsManager = inject(NotificationsManager);

  menuItems: INavData[] = [];
  $dashboardInfo!: Observable<DashboardInfo>;

  readonly toaster = viewChild(ToasterComponent);

  onScrollbarUpdate(_: any) { }

  constructor() {
    if (this.#router.url == '/web' || this.#router.url == '/web/dashboard') {
      this.#router.navigateByUrl('/web/dashboard/common');
    }
  }

  ngOnInit(): void {
    this.menuItems = this.#navManager.createSidebarMenu();

    this.$dashboardInfo = this.#dashboardClient.getCommonInfo().pipe(
      filter(response => response.type === 'finish' && !!response.value),
      map(response => response.value!)
    );

    this.#notificationsManager.$notifications
      .pipe(filter(_ => !!this.toaster()))
      .subscribe(notification => {
        const options = {
          notification,
          delay: 5000,
          placement: 'top-end',
          autohide: true,
          color: 'info'
        };

        this.toaster()!.addToast(NotificationToastComponent, { ...options })
      });
  }
}
