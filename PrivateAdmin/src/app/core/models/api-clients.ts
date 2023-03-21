import { DateTime } from 'src/app/core/models/datetime';
import { List } from "./common";

export class ApiClient {
    public id: string;
    public name: string;
    public allowedMethods: List<string> = [];
    public useCount: number;
    public lastUse: DateTime;

    static create(data: any): ApiClient | null {
        if (!data) { return null; }
        const client = new ApiClient();

        client.allowedMethods = data.allowedMethods.map((o: any) => o as string);
        client.id = data.id;
        client.lastUse = DateTime.fromISOString(data.lastUse);
        client.useCount = data.useCount;
        client.name = data.name;

        return client;
    }
}

export class ApiClientParams {
    constructor(
        public name: string,
        public allowedMethods: List<string>
    ) { }
}
