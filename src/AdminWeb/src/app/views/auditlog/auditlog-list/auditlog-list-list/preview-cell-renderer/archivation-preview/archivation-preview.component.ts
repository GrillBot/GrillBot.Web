import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import { SpacedNumberPipe } from "../../../../../../core/pipes";
import { mapArchivationProcess, recordsWord } from "../../../../../../core/enums/archivation-process";

@Component({
  selector: 'app-archivation-preview',
  templateUrl: './archivation-preview.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SpacedNumberPipe]
})
export class ArchivationPreviewComponent {
  preview = input.required<any>();

  readonly mapProcess = mapArchivationProcess;
  readonly recordsWord = recordsWord;
}
