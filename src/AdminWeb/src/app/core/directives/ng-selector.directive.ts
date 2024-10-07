import { Directive, inject } from "@angular/core";
import { NgSelectComponent } from "@ng-select/ng-select";

@Directive({
  selector: 'ng-select[ngSelector]',
  standalone: true
})
export class NgSelectorDirective {
  readonly #component = inject(NgSelectComponent);

  constructor() {
    this.#component.loadingText = 'Probíhá načítání';
    this.#component.notFoundText = 'Nejsou žádná data';
    this.#component.virtualScroll = true;
    this.#component.bindLabel ??= 'value';
    this.#component.bindValue ??= 'key';
  }
}
