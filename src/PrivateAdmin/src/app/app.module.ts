import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        loadChildren: () => import('./administration/administration.module').then(mod => mod.AdministrationModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
            deps: [PlatformLocation]
        },
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
