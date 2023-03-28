import { HttpHeaders } from '@angular/common/http';

export class QueryParam {
    constructor(
        public name: string,
        public value: any | any[]
    ) { }

    toString(): string {
        if (Array.isArray(this.value)) {
            const values = this.value as string[];
            return values.map(o => `${this.name}=${encodeURIComponent(o)}`).join('&');
        }

        return `${this.name}=${encodeURIComponent(this.value)}`;
    }
}

export type HTTPHeaders = HttpHeaders | { [header: string]: string | string[] };
