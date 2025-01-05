import { NgStyle, NgTemplateOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, ContainerComponent,
  LocalStorageService, RowComponent, TextColorDirective
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuthClient } from "../../../core/clients/auth.client";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, tap } from "rxjs";
import { AuthManager } from "../../../core/managers/auth.manager";
import { environment } from "../../../../environments/environment";

const REDIRECT_URI_KEY = 'X-GrillBot-RedirectUri';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    IconDirective,
    ButtonDirective,
    NgStyle,
    NgTemplateOutlet
  ]
})
export class LoginComponent {
  readonly #authClient = inject(AuthClient);
  readonly #authManager = inject(AuthManager);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #storage = inject(LocalStorageService);

  constructor() {
    const isFromCallback = !this.#route.snapshot.queryParams['fromCallback'];
    let redirectUri = this.#route.snapshot.queryParams['redirectUri'];

    if (redirectUri) {
      this.#storage.removeItem(REDIRECT_URI_KEY);
      this.#storage.setItem(REDIRECT_URI_KEY, redirectUri);
    } else {
      redirectUri = this.#storage.getItem(REDIRECT_URI_KEY);
    }

    if (isFromCallback) {
      return;
    }

    this.#authClient.retrieveJwtToken().pipe(
      filter(token => this.#authManager.setToken(token)),
      tap(_ => {
        this.#storage.removeItem(REDIRECT_URI_KEY);
        this.#router.navigateByUrl(redirectUri ?? '/');
      })
    ).subscribe();
  }

  startLogin(): void {
    location.href = environment.oauthApiUri;
  }
}
