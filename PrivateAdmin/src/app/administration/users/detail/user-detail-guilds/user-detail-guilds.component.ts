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

    invisibleSections: string[] = [];

    getSectionName(section: string, index: number): string {
        return `${index}#${section}`;
    }

    isVisible(section: string, index: number): boolean {
        return !this.invisibleSections.includes(this.getSectionName(section, index));
    }

    toggleVisibility(section: string, index: number): void {
        const name = this.getSectionName(section, index);

        if (this.isVisible(section, index)) {
            this.invisibleSections.push(name);
        } else {
            this.invisibleSections = this.invisibleSections.filter(o => o !== name);
        }
    }

    visibilityText(section: string, index: number): string {
        return this.isVisible(section, index) ? 'Skrýt' : 'Zobrazit';
    }

    getGuildPoints(index: number): UserPointsItem {
        if (!this.points) { return new UserPointsItem(); }
        return this.points.find(o => o.guild.id === this.userGuilds[index].guild.id) ?? new UserPointsItem();
    }
}
