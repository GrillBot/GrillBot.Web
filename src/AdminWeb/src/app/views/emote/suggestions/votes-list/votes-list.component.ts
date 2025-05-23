import { Component, computed, inject } from "@angular/core";
import { Router } from "@angular/router";
import { mapParamsFromSnapshot } from "../../../../core/mappers/router.mapper";
import { VotesListFilterComponent } from "./votes-list-filter/votes-list-filter.component";
import { VotesListListComponent } from "./votes-list-list/votes-list-list.component";

@Component({
  template: `
    <app-votes-list-filter [suggestionId]="suggestionId()" (filterEvent)="list.onFilterChanged($event)" />
    <app-votes-list-list [suggestionId]="suggestionId()" #list />
  `,
  standalone: true,
  imports: [VotesListFilterComponent, VotesListListComponent]
})
export class VotesListComponent {
  readonly #router = inject(Router);

  suggestionId = computed(() => mapParamsFromSnapshot(this.#router.routerState.snapshot.root)['suggestionId'] as string);
}
