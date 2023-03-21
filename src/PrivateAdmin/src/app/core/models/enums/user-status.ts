import { Support } from '../../lib/support';
import { SelectItem } from './../../../shared/select/models';

export enum UserStatus {
    Offline = 0,
    Online = 1,
    Idle = 2,
    AFK = 3,
    DoNotDisturb = 4,
    Invisible = 5
}

export enum StatusColorMapping {
    Offline = 'secondary',
    Online = 'success',
    Idle = 'warning',
    AFK = 'warning',
    DoNotDisturb = 'danger',
    Invisible = 'secondary'
}

export enum UserStatusTexts {
    Offline = 'Offline',
    Online = 'Online',
    Idle = 'Neaktivní',
    AFK = 'Neaktivní',
    DoNotDisturb = 'Nerušit',
    Invisible = 'Neviditelný'
}

export const getStatusSelectItem = (status: UserStatus): SelectItem => {
    const key = Support.getEnumKeyByValue(UserStatus, status);

    return {
        key: UserStatusTexts[key] as string,
        value: status,
        background: StatusColorMapping[key] as string
    };
}
