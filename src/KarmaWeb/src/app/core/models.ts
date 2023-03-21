export interface User {
    id: string;
    username: string;
    discriminator: string;
    isBot: boolean;
    avatarUrl: string;
}

export interface KarmaItem {
    user: User;
    position: number;
    positive: number;
    negative: number;
    value: number;
}

export interface KarmaResult {
    data: KarmaItem[];
    page: number;
    totalItemsCount: number;
    canNext: boolean;
    canPrev: boolean;
}
