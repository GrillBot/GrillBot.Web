import { Support } from 'src/app/core/lib/support';
import { AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Channel } from './channels';
import { FilterBase } from './common';
import { DateTime } from './datetime';
import { AuditLogItemType } from './enums/audit-log-item-type';
import { Guild } from './guilds';
import { User } from './users';

export class ClientLogItemRequest {
    constructor(
        public isInfo: boolean,
        public isWarning: boolean,
        public isError: boolean,
        public content: string,
        public appName: string,
        public source: string
    ) { }
}

export class ApiSearchRequest {
    public controllerName: string | null = null;
    public actionName: string | null = null;
    public pathTemplate: string | null = null;
    public durationFrom: number | null = null;
    public durationTo: number | null = null;
    public method: string | null = null;
    public apiGroupName: string | null = null;

    get serialized(): any {
        return {
            controllerName: this.controllerName,
            actionName: this.actionName,
            pathTemplate: this.pathTemplate,
            durationFrom: this.durationFrom,
            durationTo: this.durationTo,
            method: this.method,
            apiGroupName: this.apiGroupName
        };
    }

    static create(data: any): ApiSearchRequest {
        const request = new ApiSearchRequest();

        request.actionName = data.actionName;
        request.apiGroupName = data.apiGroupName;
        request.controllerName = data.controllerName;
        request.durationFrom = data.durationFrom;
        request.durationTo = data.durationTo;
        request.method = data.method;
        request.pathTemplate = data.pathTemplate;

        return request;
    }
}

export class ExecutionSearchRequest {
    public actionName: string | null = null;
    public success: boolean | null = null;
    public durationFrom: number | null = null;
    public durationTo: number | null = null;

    get serialized(): any {
        return {
            actionName: this.actionName,
            success: this.success,
            durationFrom: this.durationFrom,
            durationTo: this.durationTo
        };
    }

    static create(data: any): ExecutionSearchRequest {
        const request = new ExecutionSearchRequest();

        request.actionName = data.actionName;
        request.success = data.success;
        request.durationFrom = data.durationFrom;
        request.durationTo = data.durationTo;

        return request;
    }
}

export class MessageDeletedSearchRequest {
    public containsEmbed: boolean | null = null;
    public contentContains: string | null = null;
    public authorId: string | null = null;

    get serialized(): any {
        return {
            containsEmbed: this.containsEmbed,
            contentContains: this.contentContains,
            authorId: this.authorId
        };
    }

    static create(data: any): MessageDeletedSearchRequest {
        const request = new MessageDeletedSearchRequest();

        request.authorId = data.authorId;
        request.contentContains = data.contentContains;
        request.containsEmbed = data.containsEmbed;

        return request;
    }
}

export class TextSearchRequest {
    public text: string | null = null;
    public sourceAppName: string | null = null;
    public source: string | null = null;

    get serialized(): any {
        return {
            text: this.text,
            sourceAppName: this.sourceAppName,
            source: this.source
        };
    }

    static create(data: any): TextSearchRequest {
        const request = new TextSearchRequest();

        request.text = data.text;
        request.source = data.source;
        request.sourceAppName = data.sourceAppName;

        return request;
    }
}

export class UserIdSearchRequest {
    public userId: string | null = null;

    get serialized(): any {
        return {
            userId: this.userId
        };
    }

    static create(data: any): UserIdSearchRequest {
        const request = new UserIdSearchRequest();

        request.userId = data.userId;

        return request;
    }
}

export class AdvancedSearchRequest {
    public info: TextSearchRequest | null = null;
    public warning: TextSearchRequest | null = null;
    public error: TextSearchRequest | null = null;
    public interaction: ExecutionSearchRequest | null = null;
    public job: ExecutionSearchRequest | null = null;
    public api: ApiSearchRequest | null = null;
    public overwriteCreated: UserIdSearchRequest | null;
    public overwriteDeleted: UserIdSearchRequest | null;
    public overwriteUpdated: UserIdSearchRequest | null;
    public memberRolesUpdated: UserIdSearchRequest | null;
    public memberUpdated: UserIdSearchRequest | null;
    public messageDeleted: MessageDeletedSearchRequest | null = null;

    get serialized(): any {
        return {
            info: this.info?.serialized ?? null,
            warning: this.warning?.serialized ?? null,
            error: this.error?.serialized ?? null,
            interaction: this.interaction?.serialized ?? null,
            job: this.job?.serialized ?? null,
            api: this.api?.serialized ?? null,
            overwriteCreated: this.overwriteCreated?.serialized ?? null,
            overwriteDeleted: this.overwriteDeleted?.serialized ?? null,
            overwriteUpdated: this.overwriteUpdated?.serialized ?? null,
            memberRolesUpdated: this.memberRolesUpdated?.serialized ?? null,
            memberUpdated: this.memberUpdated?.serialized ?? null,
            messageDeleted: this.messageDeleted?.serialized ?? null
        };
    }

    static create(data: any): AdvancedSearchRequest {
        const request = new AdvancedSearchRequest();

        request.info = data.info ? TextSearchRequest.create(data.info) : null;
        request.warning = data.warning ? TextSearchRequest.create(data.warning) : null;
        request.error = data.error ? TextSearchRequest.create(data.error) : null;
        request.interaction = data.interaction ? ExecutionSearchRequest.create(data.interaction) : null;
        request.job = data.job ? ExecutionSearchRequest.create(data.job) : null;
        request.api = data.api ? ApiSearchRequest.create(data.api) : null;
        request.overwriteCreated = data.overwriteCreated ? UserIdSearchRequest.create(data.overwriteCreated) : null;
        request.overwriteDeleted = data.overwriteDeleted ? UserIdSearchRequest.create(data.overwriteDeleted) : null;
        request.overwriteUpdated = data.overwriteUpdated ? UserIdSearchRequest.create(data.overwriteUpdated) : null;
        request.memberRolesUpdated = data.memberRolesUpdated ? UserIdSearchRequest.create(data.memberRolesUpdated) : null;
        request.memberUpdated = data.memberUpdated ? UserIdSearchRequest.create(data.memberUpdated) : null;
        request.messageDeleted = data.messageDeleted ? MessageDeletedSearchRequest.create(data.messageDeleted) : null;

        return request;
    }
}

export class SearchRequest extends FilterBase {
    public guildId: string;
    public userIds: string[];
    public channelId: string;
    public showTypes: AuditLogItemType[];
    public ignoreTypes: AuditLogItemType[];
    public createdFrom: string;
    public createdTo: string;
    public onlyWithFiles: boolean;
    public advancedSearch: AdvancedSearchRequest;
    public ids: string[];

    static get empty(): SearchRequest {
        const request = new SearchRequest();
        request.ignoreTypes = [AuditLogItemType.API];
        request.onlyWithFiles = false;

        return request;
    }

    get serialized(): any {
        return {
            guildId: this.guildId,
            userIds: this.userIds,
            channelId: this.channelId,
            showTypes: this.showTypes,
            ignoreTypes: this.ignoreTypes,
            createdFrom: this.createdFrom,
            createdTo: this.createdTo,
            onlyWithFiles: this.onlyWithFiles,
            ids: this.ids,
            advancedSearch: this.advancedSearch?.serialized
        };
    }

    get serializedIds(): string {
        return this.ids ? this.ids.join(';') : '';
    }

    set serializedIds(value: string) {
        const ids = (value ? value : '').split(';').filter(o => !Support.isEmpty(o));
        this.ids = ids.length === 0 ? null : ids;
    }

    static create(data: any): SearchRequest {
        const request = new SearchRequest();

        request.guildId = data.guildId;
        request.userIds = data.userIds ? data.userIds : [];
        request.channelId = data.channelId;
        request.showTypes = data.showTypes ? data.showTypes : [];
        request.ignoreTypes = data.ignoreTypes ? data.ignoreTypes : [];
        request.createdFrom = data.createdFrom;
        request.createdTo = data.createdTo;
        request.onlyWithFiles = data.onlyWithFiles;
        request.serializedIds = data.serializedIds ? data.serializedIds : null;
        request.advancedSearch = data.advancedSearch ? AdvancedSearchRequest.create(data.advancedSearch) : null;

        return request;
    }
}

export class File {
    public filename: string;
    public size: number;
    public link: string;

    static create(data: any): File {
        const file = new File();

        file.filename = data.filename;
        file.size = data.size;
        file.link = data.link;

        return file;
    }
}

export class LogListItem {
    public guild: Guild | null;
    public user: User | null;
    public channel: Channel | null;
    public createdAt: DateTime;
    public id: string;
    public type: AuditLogItemType;
    public isDetailAvailable: boolean;
    public files: File[];
    public preview?: any;

    get title(): string {
        return AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, this.type)] as string;
    }

    static create(data: any): LogListItem {
        const item = new LogListItem();

        item.guild = data.guild ? Guild.create(data.guild) : null;
        item.user = data.user ? User.create(data.user) : null;
        item.channel = data.channel ? Channel.create(data.channel) : null;
        item.createdAt = DateTime.fromISOString(data.createdAt);
        item.id = data.id;
        item.type = data.type;
        item.isDetailAvailable = data.isDetailAvailable;
        item.files = data.files.map((f: any) => File.create(f));
        item.preview = data.preview;

        return item;
    }
}

export class Detail {
    public type: AuditLogItemType;
    public data: any;

    static create(data: any): Detail | null {
        if (!data) { return null; }

        const detail = new Detail();
        detail.type = data.type;
        detail.data = data.data;

        return detail;
    }
}
