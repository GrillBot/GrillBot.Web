import { Pipe, PipeTransform } from "@angular/core";
import { diffLines } from 'diff';

@Pipe({
  name: 'stringDiff',
  standalone: true
})
export class StringDiffPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string[] {
    const lines = diffLines(args[0] ?? '', value ?? '', { newlineIsToken: true });

    return lines.map(o => {
      if (o.added) {
        return `+ ${o.value}`;
      } else if (o.removed) {
        return `- ${o.value}`;
      }
      else {
        return null;
      }
    }).filter(o => o !== null);
  }

}
