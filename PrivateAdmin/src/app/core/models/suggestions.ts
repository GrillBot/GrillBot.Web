import { GuildUser } from './users';
import { DateTime } from 'src/app/core/models/datetime';
import { Guild } from './guilds';
import { RangeParams, FilterBase, createRangeParams } from './common';

export class EmoteSuggestion {
    public id: number;
    public createdAt: DateTime;
    public voteEndsAt: DateTime | null;
    public imageData: string; // Base64 data
    public guild: Guild;
    public fromUser: GuildUser;
    public emoteName: string;
    public description: string;
    public approvedForVote: boolean;
    public voteFinished: boolean;
    public communityApproved: boolean;
    public upVotes: boolean;
    public downVotes: boolean;

    static create(data: any): EmoteSuggestion | null {
        if (!data) { return null; }

        const result = new EmoteSuggestion();

        result.id = data.id;
        result.createdAt = DateTime.fromISOString(data.createdAt);
        result.voteEndsAt = data.voteEndsAt ? DateTime.fromISOString(data.voteEndsAt) : null;
        result.imageData = data.imageData;
        result.guild = Guild.create(data.guild);
        result.fromUser = GuildUser.create(data.fromUser);
        result.emoteName = data.emoteName;
        result.description = data.description;
        result.approvedForVote = data.approvedForVote;
        result.voteFinished = data.voteFinished;
        result.upVotes = data.upVotes;
        result.downVotes = data.downVotes;
        result.communityApproved = data.communityApproved;

        return result;
    }
}

export class GetSuggestionListParams extends FilterBase {
    public createdAt: RangeParams<string> | null;
    public guildId: string | null;
    public fromUserId: string | null;
    public emoteName: string;
    public onlyApprovedToVote: boolean = false;
    public onlyUnfinishedVotes: boolean = false;
    public onlyCommunityApproved: boolean = false;

    static get empty(): GetSuggestionListParams { return new GetSuggestionListParams(); }

    static create(data: any): GetSuggestionListParams | null {
        if (!data) { return null; }

        const params = this.empty;
        params.createdAt = createRangeParams(data.createdAtFrom, data.createdAtTo);
        params.guildId = data.guildId;
        params.emoteName = data.emoteName;
        params.fromUserId = data.fromUserId;
        params.onlyApprovedToVote = data.onlyApprovedToVote;
        params.onlyCommunityApproved = data.onlyCommunityApproved;
        params.onlyUnfinishedVotes = data.onlyUnfinishedVotes;

        return params;
    }

    public serialize(): any {
        return {
            createdAtFrom: this.createdAt?.from,
            createdAtTo: this.createdAt?.to,
            guildId: this.guildId,
            emoteName: this.emoteName,
            fromUserId: this.fromUserId,
            onlyApprovedToVote: this.onlyApprovedToVote,
            onlyCommunityApproved: this.onlyCommunityApproved,
            onlyUnfinishedVotes: this.onlyUnfinishedVotes
        };
    }
}
