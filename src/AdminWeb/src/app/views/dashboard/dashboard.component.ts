import { NgxFilesizeModule } from 'ngx-filesize';
import { Component, inject } from "@angular/core";
import { DashboardClient } from "../../core/clients/dashboard.client";
import {
  BadgeComponent, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent,
  RowComponent, TemplateIdDirective, WidgetStatFComponent
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AsyncPipe, DatePipe, NgTemplateOutlet } from "@angular/common";
import { TimeSpanPipe } from "../../pipes/timespan.pipe";
import { WithLoadingPipe } from '../../pipes/with-loading.pipe';
import { LoadingComponent } from "../../components/loading/loading.component";
import { ServiceInfoComponent } from './components/service-info/service-info.component';
import { ChunkPipe } from '../../pipes/chunk.pipe';
import { HasPermissionDirective } from '../../core/directives/has-permission.directive';
import { TopHeavyOperationsComponent } from "./components/top-heavy-operations/top-heavy-operations.component";

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
    ServiceInfoComponent,
    ChunkPipe,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    HasPermissionDirective,
    TopHeavyOperationsComponent
]
})
export class DashboardComponent {
  readonly #dashboardClient = inject(DashboardClient);

  readonly $getCommonInfo = this.#dashboardClient.getCommonInfo();
}
