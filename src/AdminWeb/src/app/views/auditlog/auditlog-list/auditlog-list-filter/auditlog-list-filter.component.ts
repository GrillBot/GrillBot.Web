import { ChannelLookupComponent } from './../../../../components/lookups/channel-lookup/channel-lookup.component';
import { Component, computed } from "@angular/core";
import {
  CardHeaderComponent, FilterBaseComponent, FilterButtonsComponent, FilterStoreComponent, FormCardBodyComponent,
  GuildLookupComponent, UserLookupComponent
} from "../../../../components";
import { FormSearchRequest } from "../../../../core/models/audit-log";
import { IForm } from "../../../../core/models/common";
import { AuditLogType, AuditLogTypeLocalization } from "../../../../core/enums/audit-log-type";
import { CardComponent, CardFooterComponent, ColComponent, FormControlDirective, FormLabelDirective, InputGroupComponent, RowComponent } from "@coreui/angular";
import { CheckboxComponent } from "../../../../components/forms/checkbox/checkbox.component";
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { NgSelectorDirective } from '../../../../core/directives';
import { mapEnumToDict } from '../../../../core/mappers';

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
    ReactiveFormsModule,
    UserLookupComponent,
    NgSelectComponent,
    NgSelectorDirective
  ]
})
export class AuditLogListFilterComponent extends FilterBaseComponent<FormSearchRequest> {
  logTypes = computed(() => mapEnumToDict(AuditLogType, AuditLogTypeLocalization));

  override configure(): void {
    this.filterId = 'auditlog/auditlog-list';
  }

  override createForm(): IForm<FormSearchRequest> {
    return {
      guildId: this.createControl(),
      userId: this.createControl(),
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
