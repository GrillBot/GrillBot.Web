import { Component } from "@angular/core";
import { AuditLogListFilterComponent } from "./auditlog-list-filter/auditlog-list-filter.component";

@Component({
  template: `
    <app-auditlog-list-filter />
  `,
  standalone: true,
  imports: [AuditLogListFilterComponent]
})
export class AuditLogListComponent { }
