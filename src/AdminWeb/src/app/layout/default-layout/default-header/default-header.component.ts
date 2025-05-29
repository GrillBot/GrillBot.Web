import { NgTemplateOutlet } from "@angular/common";
import { Component, computed, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
  AvatarComponent, BreadcrumbRouterComponent, ColorModeService, ContainerComponent, DropdownComponent, DropdownDividerDirective,
  DropdownHeaderDirective, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, HeaderComponent, HeaderNavComponent,
  HeaderTogglerDirective, SidebarToggleDirective, TextColorDirective, ThemeDirective
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
    RouterLink,
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
    DropdownDividerDirective
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

  sidebarId = input('sidebar1');
}
