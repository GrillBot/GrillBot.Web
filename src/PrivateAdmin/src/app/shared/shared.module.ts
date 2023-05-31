import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { ListButtonComponent } from './list-button/list-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxBitmaskComponent } from './checkbox-bitmask/checkbox-bitmask.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { TimeSpanInputComponent } from './time-span-input/time-span-input.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavigationComponent } from './navigation/navigation.component';
import { EmotePickerComponent } from './emote-picker/emote-picker.component';
import { SelectComponent } from './select/select.component';
import { ChartsModule } from './charts/charts.module';
import { CommonPageModule } from './common-page/common-page.module';
import { TabsComponent } from './tabs/tabs.component';
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { SortingDirective } from './data-list/sorting.directive';
import { DataListComponent } from './data-list/data-list.component';
import { ItemsCountComponent } from './data-list/items-count.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
    declarations: [
        CardComponent,
        LoadingComponent,
        ListButtonComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        TimeSpanInputComponent,
        SearchInputComponent,
        NavigationComponent,
        EmotePickerComponent,
        SelectComponent,
        TabsComponent,
        ModalBoxComponent,
        SortingDirective,
        DataListComponent,
        ItemsCountComponent,
        PaginationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        NgbModalModule,
        NgxFilesizeModule,
        NgSelectModule,
        DirectivesModule,
        PipesModule,
        ChartsModule,
        CommonPageModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CardComponent,
        LoadingComponent,
        ListButtonComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        NgxFilesizeModule,
        TimeSpanInputComponent,
        SearchInputComponent,
        NgSelectModule,
        DirectivesModule,
        NavigationComponent,
        PipesModule,
        EmotePickerComponent,
        SelectComponent,
        ChartsModule,
        CommonPageModule,
        TabsComponent,
        ModalBoxComponent,
        SortingDirective,
        DataListComponent,
        ItemsCountComponent,
        PaginationComponent
    ]
})
export class SharedModule { }
