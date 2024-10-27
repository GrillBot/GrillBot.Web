import { Component } from "@angular/core";
import { MeasuresListFilterComponent } from "./measures-list-filter/measures-list-filter.component";
import { MeasuresListListComponent } from "./measures-list-list/measures-list-list.component";

@Component({
  templateUrl: './measures-list.component.html',
  standalone: true,
  imports: [
    MeasuresListFilterComponent,
    MeasuresListListComponent
  ]
})
export class MeasuresListComponent { }
