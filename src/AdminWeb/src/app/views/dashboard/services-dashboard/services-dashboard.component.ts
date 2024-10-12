import { Component, inject } from "@angular/core";
import { DashboardClient } from "../../../core/clients/dashboard.client";
import { AsyncPipe } from "@angular/common";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { HasPermissionDirective } from "../../../core/directives";
import { IconDirective } from "@coreui/icons-angular";
import { LoadingComponent } from "../../../components";
import { ServiceInfoComponent } from "../components/service-info/service-info.component";
import { WithLoadingPipe, ChunkPipe } from "../../../core/pipes";

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
