import { CommonPageModule } from './common-page/common-page.module';
import { ListButtonComponent } from './list-button/list-button.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { DataListComponent } from './data-list/data-list.component';
import { LoadingComponent } from './loading/loading.component';
import { KeyValueItemDirective } from './directives/key-value-item.directive';
import { SortingDirective } from './data-list/sorting.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PipesModule } from './pipes/pipes.module';
import { PaginationComponent } from './pagination/pagination.component';
import { TabsComponent } from './tabs/tabs.component';
import { ModalBoxComponent } from './modal-box/modal-box.component';

@NgModule({
    declarations: [
        CardComponent,
        DataListComponent,
        LoadingComponent,
        KeyValueItemDirective,
        SortingDirective,
        SearchInputComponent,
        ListButtonComponent,
        CheckboxComponent,
        PaginationComponent,
        TabsComponent,
        ModalBoxComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        NgSelectModule,
        CommonPageModule,
        PipesModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CardComponent,
        DataListComponent,
        LoadingComponent,
        KeyValueItemDirective,
        SortingDirective,
        SearchInputComponent,
        NgSelectModule,
        ListButtonComponent,
        CheckboxComponent,
        CommonPageModule,
        PipesModule,
        PaginationComponent,
        TabsComponent,
        ModalBoxComponent
    ]
})
export class SharedModule { }
