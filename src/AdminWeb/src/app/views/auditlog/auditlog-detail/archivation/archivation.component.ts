import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { InfoRowComponent } from "../../../../components";
import { FilesizePipe, SpacedNumberPipe } from "../../../../core/pipes";
import { mapArchivationProcess } from "../../../../core/enums/archivation-process";

@Component({
  selector: 'app-archivation',
  templateUrl: './archivation.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [InfoRowComponent, FilesizePipe, SpacedNumberPipe]
})
export class ArchivationComponent {
  detail = input.required<Detail>();

  readonly mapProcess = mapArchivationProcess;
}
