import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FooterComponent } from "@coreui/angular";

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class DefaultFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
