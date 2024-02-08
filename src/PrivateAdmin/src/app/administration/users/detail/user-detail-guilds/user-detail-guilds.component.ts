import { List } from './../../../../core/models/common';
import { Component, Input } from '@angular/core';
import { Support } from 'src/app/core/lib/support';
import { UserPointsItem } from 'src/app/core/models/points';
import { GuildUserDetail } from 'src/app/core/models/users';

@Component({
    selector: 'app-user-detail-guilds',
    templateUrl: './user-detail-guilds.component.html',
    styleUrls: ['./user-detail-guilds.component.scss']
})
export class UserDetailGuildsComponent {
    @Input() userGuilds: List<GuildUserDetail>;
    @Input() points: List<UserPointsItem>;

    getGuildPoints(index: number): UserPointsItem {
        if (!this.points) { return new UserPointsItem(); }
        return this.points.find(o => o.guild.id === this.userGuilds[index].guild.id) ?? new UserPointsItem();
    }

    toColumns(arr: any[], columnsCount: number): any[][] {
        return Support.splitToColumns(arr, columnsCount);
    }
}
