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
}
