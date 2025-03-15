import { MessageEditedPreview } from './message-edited-preview/message-edited-preview.component';
import { ICellRendererParams } from 'ag-grid-community';
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { AuditLogType } from '../../../../../core/enums/audit-log-type';
import { ChannelPreviewComponent } from "./channel-preview/channel-preview.component";
import { ChannelUpdatedPreviewComponent } from './channel-updated-preview/channel-updated-preview.component';
import { EmoteDeletedPreviewComponent } from './emote-deleted-preview/emote-deleted-preview.component';
import { UnbanPreviewComponent } from './unban-preview/unban-preview.component';
import { MemberUpdatedPreviewComponent } from './member-updated-preview/member-updated-preview.component';
import { MemberRoleUpdatedPreviewComponent } from './member-role-updated-preview/member-role-updated-preview.component';
import { GuildUpdatedPreviewComponent } from './guild-updated-preview/guild-updated-preview.component';
import { UserLeftPreviewComponent } from './user-left-preview/user-left-preview.component';
import { UserJoinedPreviewComponent } from './user-joined-preview/user-joined-preview.component';
import { InteractionCommandPreviewComponent } from './interaction-command-preview/interaction-command-preview.component';
import { ThreadDeletedPreviewComponent } from './thread-deleted-preview/thread-deleted-preview.component';
import { JobCompletedPreviewComponent } from './job-completed-preview/job-completed-preview.component';
import { ApiPreviewComponent } from './api-preview/api-preview.component';
import { ThreadUpdatedPreviewComponent } from './thread-updated-preview/thread-updated-preview.component';
import { RoleDeletedPreviewComponent } from './role-deleted-preview/role-deleted-preview.component';
import { MessageDeletedPreviewComponent } from './message-deleted-preview/message-deleted-preview.component';
import { OverwritePreviewComponent } from './overwrite-preview/overwrite-preview.component';
import { TextPreviewComponent } from './text-preview/text-preview.component';


@Component({
  templateUrl: './preview-cell-renderer.component.html',
  standalone: true,
  imports: [
    ChannelPreviewComponent,
    ChannelUpdatedPreviewComponent,
    EmoteDeletedPreviewComponent,
    UnbanPreviewComponent,
    MemberUpdatedPreviewComponent,
    MemberRoleUpdatedPreviewComponent,
    GuildUpdatedPreviewComponent,
    UserLeftPreviewComponent,
    UserJoinedPreviewComponent,
    InteractionCommandPreviewComponent,
    ThreadDeletedPreviewComponent,
    JobCompletedPreviewComponent,
    ApiPreviewComponent,
    ThreadUpdatedPreviewComponent,
    RoleDeletedPreviewComponent,
    MessageDeletedPreviewComponent,
    MessageEditedPreview,
    OverwritePreviewComponent,
    TextPreviewComponent
  ]
})
export class PreviewCellRendererComponent implements ICellRendererAngularComp {
  preview!: any;
  type!: AuditLogType;

  agInit(params: ICellRendererParams): void {
    this.preview = params.value;
    this.type = params.data.type;
  }

  refresh(params: ICellRendererParams): boolean {
    this.preview = params.value;
    this.type = params.data.type;
    return true;
  }
}
