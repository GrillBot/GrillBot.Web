import { Component, input, output } from "@angular/core";
import { ButtonDirective } from "@coreui/angular";

@Component({
  selector: 'app-filter-buttons',
  templateUrl: './filter-buttons.component.html',
  standalone: true,
  imports: [
    ButtonDirective
  ]
})
export class FilterButtonsComponent {
  disabled = input.required<boolean>();

  onRefreshClick = output();
  onResetClick = output();
}
