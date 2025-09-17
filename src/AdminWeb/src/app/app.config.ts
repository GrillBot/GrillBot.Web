import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpCacheInterceptor, httpUnauthorizedInterceptor, httpLoggingInterceptor } from './core/interceptors';
import { GlobalErrorHandler } from './core/handlers/error.handler';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { providePrimeNG } from 'primeng/config';
import PrimeNgTheme from '@primeuix/themes/aura';

ModuleRegistry.registerModules([AllCommunityModule]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions()
    ),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        httpUnauthorizedInterceptor(),
        httpCacheInterceptor({
          urlsToCache: [
            'dashboard/bot-common-info',
            'lookup\/(?:user|guild|channel)\/\\d+$',
            'service/Points/list/chart',
            'lookup\/(?:user|guild|channel)\/list'
          ],
          globalTTL: 5 * 60 * 1000,
          ttls: {
            'dashboard/bot-common-info': 30 * 1000,
            'service/Points/list/chart': 1000
          }
        }),
        httpLoggingInterceptor()
      ])
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    providePrimeNG({
      theme: {
        preset: PrimeNgTheme
      }
    })
  ]
};
