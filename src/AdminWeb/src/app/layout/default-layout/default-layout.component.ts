import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import {
  SidebarComponent, SidebarHeaderComponent, SidebarBrandComponent, SidebarNavComponent,
  SidebarFooterComponent, SidebarToggleDirective, SidebarTogglerDirective,
  ShadowOnScrollDirective, ContainerComponent
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { DefaultFooterComponent } from "./default-footer/default-footer.component";
import { DefaultHeaderComponent } from "./default-header/default-header.component";
import { NgScrollbar } from 'ngx-scrollbar';

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
export class DefaultLayoutComponent {
  onScrollbarUpdate($event: any) { }
}
