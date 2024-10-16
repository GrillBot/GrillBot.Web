import { Component } from "@angular/core";
import { TransactionsFilterComponent } from "./transactions-filter/transactions-filter.component";
import { TransactionsListComponent } from "./transactions-list/transactions-list.component";

@Component({
  templateUrl: './transactions.component.html',
  standalone: true,
  imports: [
    TransactionsFilterComponent,
    TransactionsListComponent
  ]
})
export class TransactionsComponent { }
