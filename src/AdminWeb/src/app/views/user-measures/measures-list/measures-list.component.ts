import { Component } from "@angular/core";
import { MeasuresListFilterComponent } from "./measures-list-filter/measures-list-filter.component";
import { MeasuresListListComponent } from "./measures-list-list/measures-list-list.component";

@Component({
  template: `
    <app-measures-list-filter (filterEvent)="list.onFilterChanged($event)" />
    <app-measures-list-list #list />
  `,
  standalone: true,
  imports: [
    MeasuresListFilterComponent,
    MeasuresListListComponent
  ]
})
export class MeasuresListComponent { }
