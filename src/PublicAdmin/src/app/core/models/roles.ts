export class Role {
    public id: string;
    public name: string;
    public color: string;

    static create(data: any): Role | null {
        if (!data) { return null; }

        const role = new Role();

        role.id = data.id;
        role.name = data.name;
        role.color = data.color;

        return role;
    }
}
