import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import {
  SidebarComponent, SidebarHeaderComponent, SidebarBrandComponent, SidebarNavComponent,
  SidebarFooterComponent, SidebarToggleDirective, SidebarTogglerDirective,
  ShadowOnScrollDirective, ContainerComponent,
  INavData, BadgeComponent
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { DefaultFooterComponent } from "./default-footer/default-footer.component";
import { DefaultHeaderComponent } from "./default-header/default-header.component";
import { NgScrollbar } from 'ngx-scrollbar';
import { NavManager } from "../../core/managers/nav.manager";
import { DashboardClient } from "../../core/clients/dashboard.client";
import { Observable, filter, map } from "rxjs";
import { AsyncPipe } from "@angular/common";

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
    IconDirective,
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
    AsyncPipe
  ]
})
export class DefaultLayoutComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #navManager = inject(NavManager);
  readonly #dashboardClient = inject(DashboardClient);

  menuItems: INavData[] = [];
  $isDevelopment!: Observable<boolean>;

  onScrollbarUpdate($event: any) { }

  constructor() {
    if (this.#router.url == '/web' || this.#router.url == '/web/dashboard') {
      this.#router.navigateByUrl('/web/dashboard/common');
    }
  }

  ngOnInit(): void {
    this.menuItems = this.#navManager.createSidebarMenu();
    this.$isDevelopment = this.#dashboardClient.getCommonInfo().pipe(
      filter(response => response.type === 'finish'),
      map(response => response.value?.isDevelopment ?? false)
    );
  }
}
