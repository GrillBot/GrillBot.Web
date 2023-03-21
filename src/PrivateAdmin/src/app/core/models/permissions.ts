import { User } from './users';
import { ExplicitPermissionState, ExplicitPermissionStateTexts } from './enums/explicit-permission-state';
import { Role } from './roles';
import { QueryParam } from './http';
import { Support } from '../lib/support';

export class CreateExplicitPermissionParams {
    public command: string;
    public isRole: boolean;
    public targetId: string;
    public state: ExplicitPermissionState;

    static create(form: any): CreateExplicitPermissionParams | null {
        if (!form) { return null; }
        const params = new CreateExplicitPermissionParams();

        params.command = form.command;
        params.state = form.state;
        params.isRole = form.isRole;
        params.targetId = params.isRole ? form.role : form.user;

        return params;
    }
}

export class ExplicitPermission {
    public command: string;
    public user: User | null;
    public role: Role | null;
    public state: ExplicitPermissionState;

    get isRole(): boolean { return !!this.role; }
    get isAllowed(): boolean { return this.state === ExplicitPermissionState.Allowed; }
    get isBanned(): boolean { return this.state === ExplicitPermissionState.Banned; }
    get targetId(): string { return this.isRole ? this.role.id : this.user.id; }
    get formattedState(): string {
        return ExplicitPermissionStateTexts[Support.getEnumKeyByValue(ExplicitPermissionState, this.state)];
    }

    static create(data: any): ExplicitPermission | null {
        if (!data) { return null; }
        const permission = new ExplicitPermission();

        permission.command = data.command;
        permission.role = data.role ? Role.create(data.role) : null;
        permission.state = data.state;
        permission.user = data.user ? User.create(data.user) : null;

        return permission;
    }
}

export class GetExplicitPermissionListParams {
    public searchQuery: string | null = null;

    get queryParams(): QueryParam[] {
        return [
            this.searchQuery ? new QueryParam('searchQuery', this.searchQuery) : null
        ].filter(o => o);
    }

    static get empty(): GetExplicitPermissionListParams { return new GetExplicitPermissionListParams(); }

    static create(form: any): GetExplicitPermissionListParams | null {
        if (!form) { return null; }
        const params = new GetExplicitPermissionListParams();

        params.searchQuery = form.searchQuery;

        return params;
    }
}
