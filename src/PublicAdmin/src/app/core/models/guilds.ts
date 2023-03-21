export class Guild {
    public id: string;
    public name: string;
    public memberCount: number;
    public isConnected: boolean;

    static create(data: any): Guild {
        const item = new Guild();

        item.id = data.id;
        item.name = data.name;
        item.memberCount = data.memberCount;
        item.isConnected = data.isConnected ?? false;

        return item;
    }
}
