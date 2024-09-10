import { Component, input } from "@angular/core";
import { Sizes, SpinnerComponent } from "@coreui/angular";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [
    SpinnerComponent
  ]
})
export class LoadingComponent {
  readonly customText = input<string>();
  readonly showText = input(true);
  readonly visible = input(true);
  readonly small = input(false);
}
