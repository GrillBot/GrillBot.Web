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
        this.filter = new EmoteStatsUserListParams();
        this.filter.emoteId = atob(decodeURIComponent(this.route.snapshot.params.encodedEmoteId as string));

        this.sort.orderBy = 'UseCount';
        this.sort.descending = true;
    }

    getRequest(pagination: PaginatedParams): ObservablePaginatedData<any> {
        this.filter.set(pagination, this.sort);
        return this.emoteService.getUserStatisticsOfEmote(this.filter);
    }
}
