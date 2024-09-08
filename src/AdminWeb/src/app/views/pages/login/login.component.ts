import { NgStyle, NgTemplateOutlet } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import {
  ButtonDirective, CardBodyComponent, CardComponent, CardFooterComponent, CardGroupComponent, ColComponent, ContainerComponent,
  FormControlDirective, FormDirective, InputGroupComponent, InputGroupTextDirective, RowComponent,
  TextColorDirective
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AuthClient } from "../../../core/clients/auth.client";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, tap } from "rxjs";
import { AuthManager } from "../../../core/managers/auth.manager";
import { environment } from "../../../../environments/environment";

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
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
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

  constructor() {
    if (!this.#route.snapshot.queryParams['fromCallback']) {
      return;
    }

    this.#authClient.retrieveJwtToken().pipe(
      filter(token => this.#authManager.setToken(token)),
      tap(_ => { this.#router.navigateByUrl('/'); })
    ).subscribe();
  }

  startLogin(): void {
    location.href = environment.oauthApiUri;
  }
}
