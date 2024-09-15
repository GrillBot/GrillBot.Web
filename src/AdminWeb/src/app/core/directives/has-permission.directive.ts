import { Directive, OnInit, TemplateRef, ViewContainerRef, inject, input } from "@angular/core";
import { AuthManager } from "../managers/auth.manager";

@Directive({
  selector: '[hasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  readonly #templateRef = inject(TemplateRef<unknown>);
  readonly #viewContainer = inject(ViewContainerRef);

  readonly #authManager = inject(AuthManager);

  readonly permission = input.required<string>({ alias: 'hasPermission' });

  ngOnInit(): void {
    const permission = this.permission();
    const hasPermission = this.#authManager.hasPermission(permission);

    if (hasPermission) {
      this.#viewContainer.clear();
      this.#viewContainer.createEmbeddedView(this.#templateRef);
    }
  }
}
