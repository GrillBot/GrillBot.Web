import { Component, input, OnInit } from "@angular/core";
import { CardComponent, CardFooterComponent, ColComponent, RowComponent } from "@coreui/angular";
import { CardHeaderComponent } from "../../card-header/card-header.component";
import { FormCardBodyComponent } from "../../forms";
import { FilterStoreComponent } from "../filter-store/filter-store.component";
import { ControlContainer, FormGroup, FormGroupDirective } from "@angular/forms";
import { FilterButtonsComponent } from "../filter-buttons/filter-buttons.component";
import { FilterBaseComponent } from "../filter.component.base";

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    FormCardBodyComponent,
    CardFooterComponent,
    FilterStoreComponent,
    RowComponent,
    ColComponent,
    FilterButtonsComponent
  ],
  providers: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    },
    FormGroupDirective
  ]
})
export class FilterCardComponent implements OnInit {
  form = input.required<FormGroup<any>>();
  parentFilterComponent = input.required<FilterBaseComponent<any>>();

  constructor(private parentForm: FormGroupDirective) { }

  ngOnInit(): void {
    this.parentForm.form = this.form();
  }
}
