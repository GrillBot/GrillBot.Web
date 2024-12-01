import { Component } from "@angular/core";
import { SearchingListFilterComponent } from "./searching-list-filter/searching-list-filter.component";
import { SearchingListListComponent } from "./searching-list-list/searching-list-list.component";

@Component({
  templateUrl: './searching-list.component.html',
  standalone: true,
  imports: [SearchingListFilterComponent, SearchingListListComponent]
})
export class SearchingListComponent { }
