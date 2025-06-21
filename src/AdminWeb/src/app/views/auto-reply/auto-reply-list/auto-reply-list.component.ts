import { Component } from "@angular/core";
import { AutoReplyListFilterComponent } from "./auto-reply-list-filter/auto-reply-list-filter.component";
import { AutoReplyListListComponent } from "./auto-reply-list-list/auto-reply-list-list.component";

@Component({
  template: `<app-auto-reply-list-filter (filterEvent)="list.onFilterChanged($event)" /><app-auto-reply-list-list #list />`,
  standalone: true,
  imports: [AutoReplyListFilterComponent, AutoReplyListListComponent]
})
export class AutoReplyListComponent { }
