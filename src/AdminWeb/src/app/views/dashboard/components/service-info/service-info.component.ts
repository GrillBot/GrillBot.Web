import { Component, OnInit, inject, input } from '@angular/core';
import { ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { LoadingComponent } from '../../../../components/loading/loading.component';
import { DashboardClient } from '../../../../core/clients/dashboard.client';
import { Observable, of } from 'rxjs';
import { RawHttpResponse } from '../../../../core/models/common';
import { DashboardService } from '../../../../core/models/dashboard/dashboard-service';
import { WithLoadingPipe } from '../../../../pipes/with-loading.pipe';
import { AsyncPipe } from '@angular/common';
import { TimeSpanPipe } from '../../../../pipes/timespan.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    WidgetStatFComponent,
    IconDirective,
    TemplateIdDirective,
    LoadingComponent,
    WithLoadingPipe,
    AsyncPipe,
    TimeSpanPipe,
    RouterLink
  ]
})
export class ServiceInfoComponent implements OnInit {
  readonly #client = inject(DashboardClient);

  readonly serviceId = input.required<string>();

  $getServiceInfo: Observable<RawHttpResponse<DashboardService>>
    = of({ type: 'start' });

  ngOnInit(): void {
    this.$getServiceInfo = this.#client.getServiceInfo(this.serviceId());
  }
}
