import { NgClass } from "@angular/common";
import { Component, computed, input } from "@angular/core";
import { SpinnerComponent } from "@coreui/angular";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [
    SpinnerComponent,
    NgClass
  ]
})
export class LoadingComponent {
  readonly customText = input<string>();
  readonly showText = input(true);
  readonly visible = input(true);
  readonly small = input(false);
  readonly center = input(true);

  containerClasses = computed(() => {
    return {
      'd-flex': true,
      'align-items-center': this.center(),
      'justify-content-center': this.center()
    }
  });
}
