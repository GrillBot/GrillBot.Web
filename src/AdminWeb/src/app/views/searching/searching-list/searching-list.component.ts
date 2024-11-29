import { Component } from "@angular/core";
import { SearchingListFilterComponent } from "./searching-list-filter/searching-list-filter.component";

@Component({
  templateUrl: './searching-list.component.html',
  standalone: true,
  imports: [SearchingListFilterComponent]
})
export class SearchingListComponent { }
