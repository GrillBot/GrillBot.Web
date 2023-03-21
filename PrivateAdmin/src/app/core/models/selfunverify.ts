import { QueryParam } from "./http";

export class KeepableParams {
    public group: string;
    public name: string;

    get queryParams(): QueryParam[] {
        return [
            this.group ? new QueryParam('group', this.group) : null,
            new QueryParam('name', this.name)
        ].filter(o => o);
    }

    static create(form: any): KeepableParams | null {
        if (!form?.value) { return null; }
        const params = new KeepableParams();

        params.group = form.value.noGroup ? '_' : form.value.group;
        params.name = form.value.name;

        return params;
    }
}
