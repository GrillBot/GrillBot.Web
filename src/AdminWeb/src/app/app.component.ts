import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, Router, RouterOutlet } from '@angular/router';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './core/icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { delay, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'GrillBot';

  readonly #destroyRef = inject(DestroyRef);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor() {
    this.#titleService.setTitle(this.title);

    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('coreui-grillbot-theme-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  ngOnInit(): void {
    // Toggle Light - Dark mode
    this.#activatedRoute.queryParams.pipe(
      delay(1),
      map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
      filter(theme => ['dark', 'light', 'auto'].includes(theme)),
      tap(theme => {
        this.#colorModeService.colorMode.set(theme);
      }),
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe();

    // Change title
    this.#router.events.pipe(
      delay(1),
      filter(event => event instanceof ActivationEnd),
      map(event => (event as ActivationEnd).snapshot.data['title'] as string),
      filter(title => !!title && title.length > 0),
      tap(title => {
        this.#titleService.setTitle(`${this.title} | ${title}`);
      }),
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe();
  }
}
