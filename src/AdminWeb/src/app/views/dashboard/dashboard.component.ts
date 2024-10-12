import { Component, inject } from "@angular/core";
import { DashboardClient } from "../../core/clients/dashboard.client";
import {
  ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { AsyncPipe, DatePipe, NgTemplateOutlet } from "@angular/common";
import { LoadingComponent } from "../../components";
import { HasPermissionDirective } from '../../core/directives';
import { TopHeavyOperationsComponent } from "./components/top-heavy-operations/top-heavy-operations.component";
import { UserMeasuresComponent } from './components/user-measures/user-measures.component';
import { InteractionsComponent } from "./components/interactions/interactions.component";
import { TodayAvgTimesComponent } from "./components/today-avg-times/today-avg-times.component";
import { JobsComponent } from "./components/jobs/jobs.component";
import { TimeSpanPipe, FilesizePipe, WithLoadingPipe } from "../../core/pipes";

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
    FilesizePipe,
    AsyncPipe,
    NgTemplateOutlet,
    WithLoadingPipe,
    LoadingComponent,
    HasPermissionDirective,
    TopHeavyOperationsComponent,
    UserMeasuresComponent,
    InteractionsComponent,
    TodayAvgTimesComponent,
    JobsComponent
  ]
})
export class DashboardComponent {
  readonly #dashboardClient = inject(DashboardClient);
  readonly $getCommonInfo = this.#dashboardClient.getCommonInfo();
}
