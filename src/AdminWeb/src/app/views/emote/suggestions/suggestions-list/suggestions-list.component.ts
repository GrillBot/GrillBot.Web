import { Component } from "@angular/core";
import { SuggestionsListFilterComponent } from "./suggestions-list-filter/suggestions-list-filter.component";
import { SuggestionsListListComponent } from "./suggestions-list-list/suggestions-list-list.component";

@Component({
  template: `
    <app-suggestions-list-filter (filterEvent)="list.onFilterChanged($event)" />
    <app-suggestions-list-list #list />
  `,
  standalone: true,
  imports: [SuggestionsListFilterComponent, SuggestionsListListComponent]
})
export class SuggestionsListComponent { }
