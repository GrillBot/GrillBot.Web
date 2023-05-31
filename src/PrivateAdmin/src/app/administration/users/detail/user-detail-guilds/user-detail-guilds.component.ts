import { List } from './../../../../core/models/common';
import { Component, Input } from '@angular/core';
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
        const size = Math.ceil(arr.length / columnsCount);
        const result = [];
        let column = [];

        for (const item of arr) {
            column.push(item);

            if (column.length === size) {
                result.push(column);
                column = [];
            }
        }

        if (column.length > 0) {
            result.push(column);
        }

        return result;
    }
}
