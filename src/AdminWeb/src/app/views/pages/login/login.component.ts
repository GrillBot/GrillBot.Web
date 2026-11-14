import { NgStyle, NgTemplateOutlet } from "@angular/common";
import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import {
  ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, ContainerComponent,
  RowComponent, TextColorDirective
} from "@coreui/angular";
import { IconComponent } from "@coreui/icons-angular";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthManager } from "../../../core/managers/auth.manager";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    ButtonDirective,
    NgStyle,
    NgTemplateOutlet,
    IconComponent
  ]
})
export class LoginComponent {
  readonly #authManager = inject(AuthManager);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  /** Why the last sign-in was refused, as reported by the bot. */
  readonly loginError: string | undefined = this.#route.snapshot.queryParams['loginError'] || undefined;
  readonly privacyUrl = environment.privacyUrl;

  constructor() {
    if (this.#authManager.session.isLogged) {
      this.#router.navigateByUrl(this.#route.snapshot.queryParams['redirectUri'] ?? '/');
    }
  }

  startLogin(): void {
    this.#authManager.startLogin(this.#route.snapshot.queryParams['redirectUri']);
  }
}
