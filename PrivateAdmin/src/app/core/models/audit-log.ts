import { Support } from 'src/app/core/lib/support';
import { AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Channel } from './channels';
import { FilterBase, RangeParams, createRangeParams } from './common';
import { DateTime } from './datetime';
import { AuditLogItemType } from './enums/audit-log-item-type';
import { Guild } from './guilds';
import { User } from './users';

export class TextFilter {
    public text: string | null = null;

    get serialized(): any {
        return { text: this.text };
    }

    static create(data: any): TextFilter | null {
        if (!data) { return null; }
        const filter = new TextFilter();

        filter.text = data.text;

        return filter;
    }
}

export class ExecutionFilter {
    public name: string = null;
    public wasSuccess?: boolean;
    public duration: RangeParams<number> | null;

    get serialized(): any {
        return {
            name: this.name,
            wasSuccess: this.wasSuccess,
            durationFrom: this.duration?.from,
            durationTo: this.duration?.to
        };
    }

    static create(data: any): ExecutionFilter | null {
        if (!data) { return null; }
        const filter = new ExecutionFilter();

        filter.name = data.name;
        filter.wasSuccess = data.wasSuccess;
        filter.duration = createRangeParams(data.durationFrom, data.durationTo);

        return filter;
    }
}

export class ApiRequestFilter {
    public controllerName: string | null = null;
    public actionName: string | null = null;
    public pathTemplate: string | null = null;
    public duration?: RangeParams<number> | null;
    public method: string | null = null;
    public loggedUserRole: string | null = null;
    public apiGroupName: string | null = null;

    get serialized(): any {
        return {
            controllerName: this.controllerName,
            actionName: this.actionName,
            pathTemplate: this.pathTemplate,
            durationFrom: this.duration?.from,
            durationTo: this.duration?.to,
            method: this.method,
            loggedUserRole: this.loggedUserRole,
            apiGroupName: this.apiGroupName
        };
    }

    static create(data: any): ApiRequestFilter | null {
        if (!data) { return null; }
        const filter = new ApiRequestFilter();

        filter.controllerName = data.controllerName;
        filter.actionName = data.actionName;
        filter.pathTemplate = data.pathTemplate;
        filter.duration = createRangeParams(data.durationFrom, data.durationTo);
        filter.method = data.method;
        filter.loggedUserRole = data.loggedUserRole;
        filter.apiGroupName = data.apiGroupName;

        return filter;
    }
}

export class TargetIdFilter {
    public targetId: string;

    get serialized(): any {
        return { targetId: this.targetId };
    }

    static create(data: any): TargetIdFilter | null {
        if (!data) { return null; }
        const filter = new TargetIdFilter();

        filter.targetId = data.targetId;

        return filter;
    }
}

export class MessageDeletedFilter {
    public containsEmbed?: boolean;
    public contentContains: string;
    public authorId: string;

    get serialized(): any {
        return {
            containsEmbed: this.containsEmbed,
            contentContains: this.contentContains,
            authorId: this.authorId
        };
    }

    static create(data: any): MessageDeletedFilter | null {
        if (!data) { return null; }
        const filter = new MessageDeletedFilter();

        filter.authorId = data.authorId;
        filter.contentContains = data.contentContains;
        filter.containsEmbed = data.containsEmbed;
        filter.authorId = data.authorId;

        return filter;
    }
}

export class AuditLogListParams extends FilterBase {
    public guildId: string | null;
    public processedUserIds: string[] = [];
    public types: AuditLogItemType[] = [];
    public createdFrom: string | null;
    public createdTo: string | null;
    public ignoreBots: boolean;
    public channelId: string | null;
    public ids: string | null;
    public excludedTypes: AuditLogItemType[] = [];
    public infoFilter: TextFilter | null = null;
    public warningFilter: TextFilter | null = null;
    public errorFilter: TextFilter | null = null;
    public commandFilter: ExecutionFilter | null = null;
    public interactionFilter: ExecutionFilter | null = null;
    public jobFilter: ExecutionFilter | null = null;
    public apiRequestFilter: ApiRequestFilter | null = null;
    public overwriteCreatedFilter: TargetIdFilter | null = null;
    public overwriteUpdatedFilter: TargetIdFilter | null = null;
    public overwriteDeletedFilter: TargetIdFilter | null = null;
    public memberUpdatedFilter: TargetIdFilter | null = null;
    public memberRoleUpdatedFilter: TargetIdFilter | null = null;
    public messageDeletedFilter: MessageDeletedFilter | null = null;
    public onlyFromStart: boolean = false;
    public onlyWithFiles: boolean = false;

    static get empty(): AuditLogListParams {
        const params = new AuditLogListParams();
        params.excludedTypes = [AuditLogItemType.API];

        return params;
    }

    static create(data: any): AuditLogListParams | null {
        if (!data) { return null; }
        const params = new AuditLogListParams();

        params.guildId = data.guildId;
        params.channelId = data.channelId;
        params.createdFrom = data.createdFrom;
        params.createdTo = data.createdTo;
        params.ignoreBots = data.ignoreBots ?? false;
        params.processedUserIds = data.processedUserIds;
        params.types = data.types ? data.types : [];
        params.infoFilter = data.infoFilter ? TextFilter.create(data.infoFilter) : null
        params.warningFilter = data.warningFilter ? TextFilter.create(data.warningFilter) : null;
        params.errorFilter = data.errorFilter ? TextFilter.create(data.errorFilter) : null;
        params.commandFilter = data.commandFilter ? ExecutionFilter.create(data.commandFilter) : null;
        params.interactionFilter = data.interactionsFilter ? ExecutionFilter.create(data.interactionsFilter) : null;
        params.jobFilter = data.jobFilter ? ExecutionFilter.create(data.jobFilter) : null;
        params.apiRequestFilter = data.apiRequestFilter ? ApiRequestFilter.create(data.apiRequestFilter) : null;
        params.ids = data.ids;
        params.excludedTypes = data.excludedTypes ? data.excludedTypes : [];
        params.overwriteCreatedFilter = data.overwriteCreatedFilter ? TargetIdFilter.create(data.overwriteCreatedFilter) : null;
        params.overwriteDeletedFilter = data.overwriteDeletedFilter ? TargetIdFilter.create(data.overwriteDeletedFilter) : null;
        params.overwriteUpdatedFilter = data.overwriteUpdatedFilter ? TargetIdFilter.create(data.overwriteUpdatedFilter) : null;
        params.memberUpdatedFilter = data.memberUpdatedFilter ? TargetIdFilter.create(data.memberUpdatedFilter) : null;
        params.memberRoleUpdatedFilter = data.memberRoleUpdatedFilter ? TargetIdFilter.create(data.memberRoleUpdatedFilter) : null;
        params.messageDeletedFilter = data.messageDeletedFilter ? MessageDeletedFilter.create(data.messageDeletedFilter) : null;
        params.onlyFromStart = data.onlyFromStart;
        params.onlyWithFiles = data.onlyWithFiles;

        return params;
    }
}

export class AuditLogListItem {
    public id: number;
    public createdAt: DateTime;
    public guild: Guild | null;
    public processedUser: User | null;
    public discordAuditLogItemIds: string[] | null;
    public type: AuditLogItemType;
    public channel: Channel | null;
    public files: AuditLogFileMetadata[];
    public data: any;

    get title(): string {
        return AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, this.type)] as string;
    }

    get canOpenDetail(): boolean {
        const textTypes = [
            AuditLogItemType.Info,
            AuditLogItemType.Error,
            AuditLogItemType.Warning
        ];

        if (textTypes.includes(this.type) && (this.data as string).length > 1000) { return true; }

        const otherTypeWithDetails = [
            AuditLogItemType.Command,
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.GuildUpdated,
            AuditLogItemType.InteractionCommand,
            AuditLogItemType.ThreadDeleted,
            AuditLogItemType.JobCompleted,
            AuditLogItemType.API,
            AuditLogItemType.MessageDeleted,
            AuditLogItemType.ThreadUpdated
        ];

        return otherTypeWithDetails.includes(this.type);
    }

    get canShowColumn(): boolean {
        const types = [
            AuditLogItemType.Command,
            AuditLogItemType.ChannelCreated,
            AuditLogItemType.ChannelDeleted,
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.EmojiDeleted,
            AuditLogItemType.OverwriteCreated,
            AuditLogItemType.OverwriteDeleted,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.Unban,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.MemberRoleUpdated,
            AuditLogItemType.GuildUpdated,
            AuditLogItemType.UserLeft,
            AuditLogItemType.UserJoined,
            AuditLogItemType.MessageDeleted,
            AuditLogItemType.InteractionCommand,
            AuditLogItemType.ThreadDeleted,
            AuditLogItemType.JobCompleted,
            AuditLogItemType.API,
            AuditLogItemType.ThreadUpdated
        ];

        return types.includes(this.type);
    }

    static create(data: any): AuditLogListItem | null {
        if (!data) { return null; }
        const item = new AuditLogListItem();

        item.id = data.id;
        item.createdAt = DateTime.fromISOString(data.createdAt as string);
        item.guild = data.guild ? Guild.create(data.guild) : null;
        item.processedUser = data.processedUser ? User.create(data.processedUser) : null;
        item.discordAuditLogItemIds = data.discordAuditLogItemId;
        item.type = data.type;
        item.channel = data.channel ? Channel.create(data.channel) : null;
        item.files = (data.files as any[]).map((o: any) => AuditLogFileMetadata.create(o)).filter((o: AuditLogFileMetadata) => o);
        item.data = data.data;

        return item;
    }
}

export class AuditLogFileMetadata {
    public id: number;
    public filename: string;
    public size: number;
    public sasLink: string | null;

    static create(data: any): AuditLogFileMetadata | null {
        if (!data) { return null; }
        const metadata = new AuditLogFileMetadata();

        metadata.id = data.id;
        metadata.size = data.size;
        metadata.filename = data.filename;
        metadata.sasLink = data.sasLink ? data.sasLink : null;

        return metadata;
    }
}

export class ClientLogItemRequest {
    constructor(
        public isInfo: boolean,
        public isWarning: boolean,
        public isError: boolean,
        public content: string
    ) { }
}
