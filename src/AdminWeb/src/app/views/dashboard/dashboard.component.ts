import { NgxFilesizeModule } from 'ngx-filesize';
import { Component, inject } from "@angular/core";
import { DashboardClient } from "../../core/clients/dashboard.client";
import { BadgeComponent, ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AsyncPipe, DatePipe, NgTemplateOutlet } from "@angular/common";
import { TimeSpanPipe } from "../../pipes/timespan.pipe";
import { WithLoadingPipe } from '../../pipes/with-loading.pipe';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    WidgetStatFComponent,
    TemplateIdDirective,
    IconDirective,
    DatePipe,
    TimeSpanPipe,
    NgxFilesizeModule,
    BadgeComponent,
    AsyncPipe,
    NgTemplateOutlet,
    WithLoadingPipe,
    LoadingComponent,
    LoadingComponent
]
})
export class DashboardComponent {
  readonly #dashboardClient = inject(DashboardClient);

  readonly $getCommonInfo = this.#dashboardClient.getCommonInfo();
}
