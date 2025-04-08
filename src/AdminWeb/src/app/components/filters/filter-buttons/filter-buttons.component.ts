import { Component, computed, input, output } from "@angular/core";
import { ButtonDirective } from "@coreui/angular";
import { FilterBaseComponent } from "../filter.component.base";

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
  filterComponent = input.required<FilterBaseComponent<any>>();
}
