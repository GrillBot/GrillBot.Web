import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling, withRouterConfig,
  withViewTransitions
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpCacheInterceptor, httpUnauthorizedInterceptor, httpLoggingInterceptor } from './core/interceptors';
import { GlobalErrorHandler } from './core/handlers/error.handler';

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
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        httpUnauthorizedInterceptor(),
        httpCacheInterceptor({
          urlsToCache: [
            'dashboard/bot-common-info',
            'lookup\/(?:user|guild)\/\\d+$',
            'service/Points/list/chart',
            'lookup\/(?:user|guild)\/list'
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
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
