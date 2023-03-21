import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'bitmaskToString'
})
export class BitmaskToStringPipe implements PipeTransform {
    transform(value: number, ...args: any[]): string {
        const length = args && args.length > 0 ? parseInt(args[0] as string, 10) : Number.MAX_SAFE_INTEGER;

        let bits = new Array(length).fill(0);
        for (let i = 0; i < length; i++) {
            if ((value & Math.pow(2, i)) !== 0) {
                bits[i] = 1;
            }
        }

        bits = bits.reverse();
        const firstBitAt = bits.indexOf(1);
        return firstBitAt === -1 ? '0' : bits.join('').substring(firstBitAt);
    }
}
