
export class ClientLogItemRequest {
    constructor(
        public isInfo: boolean,
        public isWarning: boolean,
        public isError: boolean,
        public content: string,
        public appName: string,
        public source: string
    ) { }
}

