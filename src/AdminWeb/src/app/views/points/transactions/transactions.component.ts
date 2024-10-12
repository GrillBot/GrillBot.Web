import { Component } from "@angular/core";
import { TransactionsFilterComponent } from "./transactions-filter/transactions-filter.component";

@Component({
  templateUrl: './transactions.component.html',
  standalone: true,
  imports: [
    TransactionsFilterComponent
  ]
})
export class TransactionsComponent { }
