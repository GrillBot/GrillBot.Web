import { Directive, effect, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: '[visibility]',
  standalone: true
})
export class VisibilityDirective {
  readonly #element = inject(ElementRef<HTMLElement>);

  isVisible = input<boolean>(false);
  isVisibleBy = input<{ bodyVisible: () => boolean }>();

  constructor() {
    effect(() => {
      const isVisible = this.isVisibleBy()?.bodyVisible() ?? this.isVisible();

      if (isVisible) {
        this.#element.nativeElement.classList.remove('d-none');
      } else {
        this.#element.nativeElement.classList.add('d-none');
      }
    });
  }
}
