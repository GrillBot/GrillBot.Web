import { Component } from "@angular/core";
import { ReminderListFilterComponent } from "./reminder-list-filter/reminder-list-filter.component";
import { ReminderListListComponent } from "./reminder-list-list/reminder-list-list.component";

@Component({
  template: '<app-reminder-list-filter (filterEvent)="list.onFilterChanged($event)" /><app-reminder-list-list #list />',
  standalone: true,
  imports: [
    ReminderListFilterComponent,
    ReminderListListComponent
  ]
})
export class ReminderListComponent { }
