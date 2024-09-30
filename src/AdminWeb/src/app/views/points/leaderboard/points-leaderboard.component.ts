import { Component } from "@angular/core";
import { CardBodyComponent, CardComponent, ColComponent, RowComponent } from "@coreui/angular";
import { CardHeaderComponent } from "../../../components";
import { VisibilityDirective } from "../../../core/directives/visibility.directive";

@Component({
  templateUrl: './points-leaderboard.component.html',
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    VisibilityDirective
  ]
})
export class PointsLeaderboardComponent {

}
