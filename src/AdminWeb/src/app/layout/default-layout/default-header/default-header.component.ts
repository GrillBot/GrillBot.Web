import { NgTemplateOutlet, NgStyle } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import {
  AvatarComponent, BadgeComponent, BreadcrumbRouterComponent, ColorModeService, ContainerComponent,
  DropdownComponent, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective,
  DropdownMenuDirective, DropdownToggleDirective, HeaderComponent, HeaderNavComponent, HeaderTogglerDirective,
  NavItemComponent, NavLinkDirective, ProgressBarDirective, ProgressComponent, SidebarToggleDirective,
  TextColorDirective, ThemeDirective
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuthManager } from "../../../core/managers/auth.manager";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    TextColorDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    BadgeComponent,
    DropdownDividerDirective,
    ProgressBarDirective,
    ProgressComponent,
    NgStyle
  ]
})
export class DefaultHeaderComponent extends HeaderComponent {
  readonly #colorModeService = inject(ColorModeService);
  readonly colorMode = this.#colorModeService.colorMode;

  readonly authManager = inject(AuthManager);

  readonly colorModes = [
    { name: 'light', text: 'Světlý', icon: 'cilSun' },
    { name: 'dark', text: 'Tmavý', icon: 'cilMoon' }
  ];

  readonly icons = computed(() => {
    const currentMode = this.colorMode();
    return this.colorModes.find(mode => mode.name === currentMode)?.icon ?? 'cilSun';
  });

  constructor() {
    super();
  }

  sidebarId = input('sidebar1');
}
