/* eslint-disable @typescript-eslint/naming-convention, no-shadow */
import { UserFlags } from 'src/app/core/models/enums/user-flags';

export enum UserFilterFlags {
    BotAdmin = 1,
    WebAdmin = 2,
    NotUser = 4,
    WebAdminOnline = 16,
    HaveBirthday = 128
}

export enum UserFilterFlagsTexts {
    BotAdmin = 'Administrátor bota',
    WebAdmin = 'Přístup do webové administrace',
    NotUser = 'Je bot',
    HaveBirthday = 'Má uložené narozeniny',
    WebAdminOnline = 'Přihlášen do webové administrace'
}

export const UserFilterMapping = [
    { source: UserFilterFlags.BotAdmin, destination: UserFlags.BotAdmin },
    { source: UserFilterFlags.NotUser, destination: UserFlags.NotUser },
    { source: UserFilterFlags.WebAdmin, destination: UserFlags.WebAdmin },
    { source: UserFilterFlags.WebAdminOnline, destination: UserFlags.WebAdminOnline }
];
