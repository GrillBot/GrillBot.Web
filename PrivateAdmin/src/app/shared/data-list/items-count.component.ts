import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-items-count',
    template: '<span>Počet záznamů: {{itemsCount}}</span>'
})
export class ItemsCountComponent {
    itemsCount: number;

    constructor(private dataList: DataListComponent) {
        this.dataList.setDataEvent.subscribe(result => {
            this.itemsCount = result.totalItemsCount;
        });
    }
}
