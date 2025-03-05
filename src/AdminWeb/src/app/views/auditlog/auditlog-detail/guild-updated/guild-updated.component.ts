import { Component, input } from "@angular/core";
import { Detail } from "../../../../core/models/audit-log";
import { TableDirective } from "@coreui/angular";
import { ChannelLookupPipe, CheckboxComponent } from "../../../../components";
import { AsyncPipe } from "@angular/common";
import { AsBitmaskStringPipe, AsReadonlyFormControlPipe, TimeSpanPipe } from "../../../../core/pipes";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-guild-updated',
  templateUrl: './guild-updated.component.html',
  standalone: true,
  imports: [
    TableDirective,
    ChannelLookupPipe,
    AsyncPipe,
    TimeSpanPipe,
    AsReadonlyFormControlPipe,
    ReactiveFormsModule,
    AsBitmaskStringPipe,
    CheckboxComponent
  ]
})
export class GuildUpdatedComponent {
  detail = input.required<Detail>();

  formatDefaultMessageNotifications(value: number): string {
    switch (value) {
      case 0: return 'Všechny zprávy';
      case 1: return 'Pouze označení';
      default: return '';
    }
  }

  formatVerificationLevel(value: number): string {
    switch (value) {
      case 0: return 'Žádná';
      case 1: return 'Nízká';
      case 2: return 'Střední';
      case 3: return 'Vysoká';
      case 4: return 'Extrémní';
      default: return '';
    }
  }

  formatExplicitContentFilter(value: number): string {
    switch (value) {
      case 0: return 'Vypnuto';
      case 1: return 'Uživatelé bez rolí';
      case 2: return 'Všichni uživatelé';
      default: return '';
    }
  }

  formatNsfwLevel(value: number): string {
    switch (value) {
      case 0: return 'Výchozí';
      case 1: return 'Explicitní';
      case 2: return 'Bezpečný';
      case 3: return 'Věkově omezený';
      default: return '';
    }
  }
}
