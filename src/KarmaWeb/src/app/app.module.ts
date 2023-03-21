import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoaderComponent } from './loader.component';
import { NumberFormatPipe } from './core/number-format.pipe';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoaderComponent,
        NumberFormatPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgbPaginationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
