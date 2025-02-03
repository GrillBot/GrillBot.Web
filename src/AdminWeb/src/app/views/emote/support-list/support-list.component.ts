import { Component } from "@angular/core";
import { SupportListFilterComponent } from "./support-list-filter/support-list-filter.component";
import { SupportListListComponent } from "./support-list-list/support-list-list.component";

@Component({
  template: `
    <app-support-list-filter (filterEvent)="list.onFilterChanged($event)" />
    <app-support-list-list #list />
  `,
  standalone: true,
  imports: [SupportListFilterComponent, SupportListListComponent]
})
export class SupportListComponent { }
