import { Component, inject } from "@angular/core";
import { DashboardClient } from "../../../core/clients/dashboard.client";
import { AsyncPipe } from "@angular/common";
import { WithLoadingPipe } from "../../../pipes/with-loading.pipe";
import { LoadingComponent } from "../../../components/loading/loading.component";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { ChunkPipe } from "../../../pipes/chunk.pipe";
import { ServiceInfoComponent } from "../components/service-info/service-info.component";
import { HasPermissionDirective } from "../../../core/directives/has-permission.directive";
import { IconDirective } from "@coreui/icons-angular";

@Component({
  selector: 'app-services-dashboard',
  templateUrl: './services-dashboard.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    WithLoadingPipe,
    LoadingComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    ChunkPipe,
    ServiceInfoComponent,
    HasPermissionDirective,
    IconDirective
  ]
})
export class ServicesDashboardComponent {
  readonly #dashboardClient = inject(DashboardClient);

  readonly $getCommonInfo = this.#dashboardClient.getCommonInfo();
}
