import { ChannelLookupComponent } from './../../../../components/lookups/channel-lookup/channel-lookup.component';
import { Component } from "@angular/core";
import {
  CardHeaderComponent, FilterBaseComponent, FilterButtonsComponent, FilterStoreComponent,
  FormCardBodyComponent, GuildLookupComponent
} from "../../../../components";
import { FormSearchRequest } from "../../../../core/models/audit-log";
import { IForm } from "../../../../core/models/common";
import { AuditLogType } from "../../../../core/enums/audit-log-type";
import { CardComponent, CardFooterComponent, ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent } from "@coreui/angular";
import { CheckboxComponent } from "../../../../components/forms/checkbox/checkbox.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auditlog-list-filter',
  templateUrl: './auditlog-list-filter.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    FormCardBodyComponent,
    RowComponent,
    ColComponent,
    GuildLookupComponent,
    FormControlDirective,
    InputGroupComponent,
    FormLabelDirective,
    CardFooterComponent,
    FilterStoreComponent,
    FilterButtonsComponent,
    ChannelLookupComponent,
    CheckboxComponent,
    ReactiveFormsModule
  ]
})
export class AuditLogListFilterComponent extends FilterBaseComponent<FormSearchRequest> {
  override configure(): void {
    this.filterId = 'auditlog/auditlog-list';
  }

  override createForm(): IForm<FormSearchRequest> {
    return {
      guildId: this.createControl(),
      userIds: this.createControl(),
      channelId: this.createControl(),
      showTypes: this.createControl(),
      ignoreTypes: this.createControl({ validators: [] }, [AuditLogType.Api]),
      createdFrom: this.createControl(),
      createdTo: this.createControl(),
      onlyWithFiles: this.createControl({ validators: [] }, false),
      ids: this.createControl()
    };
  }
}
