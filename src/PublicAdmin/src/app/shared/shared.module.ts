import { CommonPageModule } from './common-page/common-page.module';
import { ListButtonComponent } from './list-button/list-button.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { DataListComponent } from './data-list/data-list.component';
import { NgbModalModule, NgbPaginationModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { KeyValueItemDirective } from './directives/key-value-item.directive';
import { ModalComponent } from './modal/modal.component';
import { ValidationErrorsModalComponent } from './modal/validation-errors-modal/validation-errors-modal.component';
import { SortingDirective } from './data-list/sorting.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    declarations: [
        CardComponent,
        DataListComponent,
        LoadingComponent,
        KeyValueItemDirective,
        ModalComponent,
        ValidationErrorsModalComponent,
        SortingDirective,
        SearchInputComponent,
        ListButtonComponent,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbPaginationModule,
        RouterModule,
        NgbModalModule,
        NgSelectModule,
        CommonPageModule,
        PipesModule,
        NgbNavModule
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
        ModalComponent,
        ValidationErrorsModalComponent,
        SortingDirective,
        SearchInputComponent,
        NgSelectModule,
        ListButtonComponent,
        CheckboxComponent,
        CommonPageModule,
        PipesModule,
        NgbNavModule
    ]
})
export class SharedModule { }
