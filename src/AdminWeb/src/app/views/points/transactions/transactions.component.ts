import { Component } from "@angular/core";
import { TransactionsFilterComponent } from "./transactions-filter/transactions-filter.component";
import { TransactionsListComponent } from "./transactions-list/transactions-list.component";

@Component({
  template: '<app-transactions-filter (filterEvent)="list.onFilterChanged($event)" /><app-transactions-list #list />',
  standalone: true,
  imports: [
    TransactionsFilterComponent,
    TransactionsListComponent
  ]
})
export class TransactionsComponent { }
