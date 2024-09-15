import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'chunk',
  standalone: true
})
export class ChunkPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any[][] {
    const chunkSize = args[0] ?? 4;
    const result: any[] = [];

    for (let i = 0; i < value.length; i += chunkSize) {
      result.push(value.slice(i, i + chunkSize));
    }

    return result;
  }
}
