import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import {
  SidebarComponent, SidebarHeaderComponent, SidebarBrandComponent, SidebarNavComponent,
  SidebarFooterComponent, SidebarToggleDirective, SidebarTogglerDirective,
  ShadowOnScrollDirective, ContainerComponent,
  INavData
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { DefaultFooterComponent } from "./default-footer/default-footer.component";
import { DefaultHeaderComponent } from "./default-header/default-header.component";
import { NgScrollbar } from 'ngx-scrollbar';
import { NavManager } from "../../core/managers/nav.manager";

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
    DefaultFooterComponent
  ]
})
export class DefaultLayoutComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #navManager = inject(NavManager);

  menuItems: INavData[] = [];

  onScrollbarUpdate($event: any) { }

  ngOnInit(): void {
    if (this.#router.url == '/web') {
      this.#router.navigateByUrl('/web/dashboard');
      return;
    }

    this.menuItems = this.#navManager.createSidebarMenu();
  }
}
