import { Component } from "@angular/core";
import { EmoteListFilterComponent } from "./emote-list-filter/emote-list-filter.component";
import { EmoteListListComponent } from "./emote-list-list/emote-list-list.component";

@Component({
  template: `
    <app-emote-list-filter (filterEvent)="list.onFilterChanged($event)" />
    <app-emote-list-list #list />
  `,
  standalone: true,
  imports: [EmoteListFilterComponent, EmoteListListComponent]
})
export class EmoteListComponent { }
