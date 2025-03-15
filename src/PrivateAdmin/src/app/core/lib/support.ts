import { Dictionary } from '../models/common';

export class Support {
    static getEnumKeyByValue(type: any, value: any): string {
        return Object.keys(type).find(o => type[o] === value);
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

    static createDictFromObj<TValue>(obj: any, valueConverter?: (value: any) => TValue): Dictionary<string, TValue> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.keys(obj)
            .map(k => ({ key: k, value: valueConverter ? valueConverter(obj[k]) : obj[k] as TValue }));
    }

    static isEmpty(val?: string): boolean {
        return !(val && val.length > 0);
    }

    static splitToColumns(arr: any[], columnsCount: number): any[][] {
        const size = Math.ceil(arr.length / columnsCount);
        const result = [];
        let column = [];

        for (const item of arr) {
            column.push(item);

            if (column.length === size) {
                result.push(column);
                column = [];
            }
        }

        if (column.length > 0) {
            result.push(column);
        }

        return result;
    }
}
