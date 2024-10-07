import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withHashLocation, withInMemoryScrolling, withRouterConfig, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpCacheInterceptor } from './core/interceptors/http-cache.interceptor';
import { httpLoggingInterceptor } from './core/interceptors/logging.interceptor';

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
        httpCacheInterceptor({
          urlsToCache: [
            'dashboard/bot-common-info',
            'lookup\/user\/\\d+$'
          ],
          globalTTL: 5 * 60 * 1000,
          ttls: {
            'dashboard/bot-common-info': 30 * 1000
          }
        }),
        httpLoggingInterceptor()
      ])
    )
  ]
};
