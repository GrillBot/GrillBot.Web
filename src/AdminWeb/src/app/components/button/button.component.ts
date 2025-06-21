import { Component, computed, inject, input, Signal } from "@angular/core";
import { ButtonDirective, Colors } from "@coreui/angular";
import { VisibilityDirective } from "../../core/directives";
import { ButtonDef } from "./button.models";
import { Router } from "@angular/router";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [
    ButtonDirective,
    VisibilityDirective,
    IconDirective
  ]
})
export class ButtonComponent {
  readonly #router = inject(Router);

  def = input.required<ButtonDef>();
  data = input<any>();

  color = computed(() => {
    const def = this.def();

    const color = typeof def.color === 'function' ? def.color(this.data()) : def.color;
    return color ?? 'transparent';
  });

  isVisible = computed(() => {
    const def = this.def();
    return def.isVisible ? def.isVisible(this.data()) : true;
  });

  title = computed(() => {
    const def = this.def();
    return typeof def.title === 'function' ? def.title(this.data()) : def.title;
  });

  class = computed(() => {
    switch (this.def().variant) {
      case 'outline':
        return '';
      default:
        return 'text-decoration-underline pt-0 pb-0 mb-1';
    }
  });

  onClick() {
    const def = this.def();

    if (def.action) {
      def.action(this.data());
    } else if (def.redirectTo) {
      const redirectUrl = typeof def.redirectTo === 'function' ? def.redirectTo(this.data()) : def.redirectTo;
      this.#router.navigate([redirectUrl]);
    }
  }
}
