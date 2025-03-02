import { Component } from "@angular/core";
import { AuditLogListFilterComponent } from "./auditlog-list-filter/auditlog-list-filter.component";
import { AuditLogListListComponent } from "./auditlog-list-list/auditlog-list-list.component";

@Component({
  template: `
    <app-auditlog-list-filter (filterEvent)="list.onFilterChanged($event)" />
    <app-auditlog-list-list #list />
  `,
  standalone: true,
  imports: [AuditLogListFilterComponent, AuditLogListListComponent]
})
export class AuditLogListComponent { }
