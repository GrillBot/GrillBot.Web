import { PipesModule } from './pipes/pipes.module';
import { DirectivesModule } from './directives/directives.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { NgbModalModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { ListButtonComponent } from './list-button/list-button.component';
import { ModalComponent } from './modal/modal.component';
import { ValidationErrorsModalComponent } from './modal/validation-errors-modal/validation-errors-modal.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxBitmaskComponent } from './checkbox-bitmask/checkbox-bitmask.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { TimeSpanInputComponent } from './time-span-input/time-span-input.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavigationComponent } from './navigation/navigation.component';
import { EmotePickerComponent } from './emote-picker/emote-picker.component';
import { DataListModule } from './data-list/data-list.module';
import { SelectComponent } from './select/select.component';
import { ChartsModule } from './charts/charts.module';
import { CommonPageModule } from './common-page/common-page.module';

@NgModule({
    declarations: [
        CardComponent,
        LoadingComponent,
        ListButtonComponent,
        ModalComponent,
        ValidationErrorsModalComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        TimeSpanInputComponent,
        SearchInputComponent,
        NavigationComponent,
        EmotePickerComponent,
        SelectComponent
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
        DataListModule,
        ChartsModule,
        CommonPageModule,
        NgbNavModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CardComponent,
        LoadingComponent,
        ListButtonComponent,
        ModalComponent,
        ValidationErrorsModalComponent,
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
        DataListModule,
        SelectComponent,
        ChartsModule,
        CommonPageModule,
        NgbNavModule
    ]
})
export class SharedModule { }
