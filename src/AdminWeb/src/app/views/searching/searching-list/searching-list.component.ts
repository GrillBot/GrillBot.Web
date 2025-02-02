import { Component } from "@angular/core";
import { SearchingListFilterComponent } from "./searching-list-filter/searching-list-filter.component";
import { SearchingListListComponent } from "./searching-list-list/searching-list-list.component";

@Component({
  template: `
    <app-searching-list-filter (filterEvent)="list.onFilterChanged($event)" />
    <app-searching-list-list #list />
  `,
  standalone: true,
  imports: [SearchingListFilterComponent, SearchingListListComponent]
})
export class SearchingListComponent { }
