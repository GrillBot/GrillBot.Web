import { Component } from "@angular/core";
import { SuggestionsListFilterComponent } from "./suggestions-list-filter/suggestions-list-filter.component";

@Component({
  template: `
    <app-suggestions-list-filter />
  `,
  standalone: true,
  imports: [SuggestionsListFilterComponent]
})
export class SuggestionsListComponent { }
