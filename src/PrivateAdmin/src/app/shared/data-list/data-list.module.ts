import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DataListComponent } from './data-list.component';
import { ItemsCountComponent } from './items-count.component';
import { SortingDirective } from './sorting.directive';

@NgModule({
    declarations: [
        SortingDirective,
        DataListComponent,
        ItemsCountComponent
    ],
    imports: [
        ReactiveFormsModule,
        NgbPaginationModule,
        CommonModule
    ],
    exports: [
        SortingDirective,
        DataListComponent,
        ItemsCountComponent
    ]
})
export class DataListModule { }
