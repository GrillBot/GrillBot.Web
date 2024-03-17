import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservablePaginatedData, PaginatedParams } from 'src/app/core/models/common';
import { EmoteStatsUserListParams } from 'src/app/core/models/emotes';
import { EmotesService } from 'src/app/core/services/emotes.service';
import { ListComponentBase } from 'src/app/shared/common-page/list-component-base';
import { INavigation } from 'src/app/shared/navigation/navigation';
import { EmotesNavigation } from '../navigation';

@Component({
    selector: 'app-emote-users-list',
    templateUrl: './emote-users-list.component.html'
})
export class EmoteUsersListComponent extends ListComponentBase<EmoteStatsUserListParams> {
    navigation: INavigation;

    constructor(
        private route: ActivatedRoute,
        private emoteService: EmotesService
    ) {
        super();
        this.navigation = new EmotesNavigation(route);
    }

    configure(): void {
        const emoteData = atob(decodeURIComponent(this.route.snapshot.params.encodedEmoteData as string));
        const [guildId, emoteId] = emoteData.split(/:(.*)/s);

        this.filter = new EmoteStatsUserListParams();
        this.filter.emoteId = emoteId;
        this.filter.guildId = guildId;

        this.sort.orderBy = 'UseCount';
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): ObservablePaginatedData<any> {
        this.filter.set(pagination, this.sort);
        return this.emoteService.getUserStatisticsOfEmote(this.filter);
    }
}
