import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ColComponent, RowComponent } from "@coreui/angular";

@Component({
  selector: 'app-info-row',
  templateUrl: './info-row.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    RouterLink
  ]
})
export class InfoRowComponent {
  key = input.required<string>();
  value = input.required<string | null | undefined>();
  linkTo = input<string | null>();
}
