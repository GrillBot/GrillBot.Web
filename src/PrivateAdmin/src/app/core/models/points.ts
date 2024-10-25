import { Guild } from './guilds';
import { User } from './users';

export class UserPointsItem {
    public user: User | null = null;
    public guild: Guild | null = null;
    public nickname: string | null = null;
    public pointsYearBack = 0;
    public pointsMonthBack = 0;
    public pointsToday = 0;
    public totalPoints = 0;

    get anyPoints(): boolean { return this.totalPoints > 0; }

    static create(data: any): UserPointsItem | null {
        if (!data) { return null; }
        const item = new UserPointsItem();

        item.user = User.create(data.user);
        item.guild = Guild.create(data.guild);
        item.nickname = data.nickname;
        item.pointsYearBack = data.pointsYearBack;
        item.pointsMonthBack = data.pointsMonthBack;
        item.pointsToday = data.pointsToday;
        item.totalPoints = data.totalPoints;

        return item;
    }
}
