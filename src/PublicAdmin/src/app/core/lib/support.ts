import { Dictionary } from '../models/common';

export class Support {
    static getEnumKeyByValue(type: any, value: any): string {
        /* eslint-disable */
        return Object.keys(type).find(o => type[o] === value);
        /* eslint-enable */
    }

    static flattern<T>(arr: Array<T>): any[] {
        const result = [];

        for (const item of arr) {
            if (Array.isArray(item)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                result.push(...this.flattern(item));
            } else {
                result.push(item);
            }
        }

        return result;
    }

    static isEmpty(val?: string): boolean {
        return !(val && val.length > 0);
    }

    static createDictFromObj<TValue>(obj: any, valueConverter?: (value: any) => TValue): Dictionary<string, TValue> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.keys(obj)
            .map(k => ({ key: k, value: valueConverter ? valueConverter(obj[k]) : obj[k] as TValue }));
    }
}
