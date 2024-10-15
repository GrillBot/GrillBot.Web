import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'chunk',
  standalone: true
})
export class ChunkPipe implements PipeTransform {
  transform<T>(value: T[], ...args: any[]): T[][] {
    const chunkSize = args[0] ?? 4;
    const result: T[][] = [];

    for (let i = 0; i < value.length; i += chunkSize) {
      result.push(value.slice(i, i + chunkSize));
    }

    return result;
  }
}
