import { diffLines } from 'diff';
import { Dictionary } from '../models/common';

export class Support {
    static getEnumKeyByValue(type: any, value: any): string {
        return Object.keys(type).find(o => type[o] === value);
    }

    static cut(value: string, maxLength: number): string {
        return value.length <= maxLength ? value : `${value.substring(0, maxLength - 3)}...`;
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

    static createDiff(before: string, after: string): string[] {
        if (!before || !after) {
            return [];
        }
        const lines = diffLines(before, after, { newlineIsToken: true, ignoreCase: true });
        return lines.map(o => {
            if (o.added) { return `+ ${o.value}`; }
            else if (o.removed) { return `- ${o.value}`; }
            else { return null; }
        }).filter(o => o !== null);
    }

    static createDictFromObj<TValue>(obj: any): Dictionary<string, TValue> {
        return Object.keys(obj).map(k => ({ key: k, value: obj[k] as TValue }));
    }
}
