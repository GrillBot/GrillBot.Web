import { Directive, inject } from "@angular/core";
import { NgSelectComponent } from "@ng-select/ng-select";

@Directive({
  selector: 'ng-select[ngSelector]',
  standalone: true
})
export class NgSelectorDirective {
  readonly #component = inject(NgSelectComponent);

  constructor() {
    this.#component.config.loadingText = 'Probíhá načítání';
    this.#component.config.notFoundText = 'Nejsou žádná data';
    this.#component.config.disableVirtualScroll = false;

    if (!this.#component.bindLabel()) {
      this.#component.bindLabel.set('value');
    }

    if (!this.#component.bindValue()) {
      this.#component.bindValue.set('key');
    }
  }
}
