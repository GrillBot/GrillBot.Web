import { Directive, effect, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: '[visibility]',
  standalone: true
})
export class VisibilityDirective {
  readonly #element = inject(ElementRef<HTMLElement>);

  isVisible = input<boolean>(false);

  constructor() {
    effect(() => {
      if (this.isVisible()) {
        this.#element.nativeElement.classList.remove('d-none');
      } else {
        this.#element.nativeElement.classList.add('d-none');
      }
    });
  }
}
