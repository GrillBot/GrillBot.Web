import { Component } from "@angular/core";
import { ReminderListFilterComponent } from "./reminder-list-filter/reminder-list-filter.component";
import { ReminderListListComponent } from "./reminder-list-list/reminder-list-list.component";

@Component({
  templateUrl: './reminder-list.component.html',
  standalone: true,
  imports: [
    ReminderListFilterComponent,
    ReminderListListComponent
  ]
})
export class ReminderListComponent { }
