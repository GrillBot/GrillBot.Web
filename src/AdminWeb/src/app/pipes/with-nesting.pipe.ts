import { Pipe, PipeTransform } from "@angular/core";

interface NestedObject<TValue> {
  level: number;
  item: TValue;
}

@Pipe({
  name: 'withNesting',
  standalone: true
})
export class WithNestingPipe implements PipeTransform {
  transform<TValue>(value: TValue[], ...args: any[]): NestedObject<TValue>[] {
    return this.transformInternal<TValue>(value, 0);
  }

  private transformInternal<TValue>(value: TValue[], level: number): NestedObject<TValue>[] {
    const result: NestedObject<TValue>[] = [];

    for (const item of value) {
      result.push({ level, item } as NestedObject<TValue>);

      if ((item as any).childItems.length > 0) {
        result.push(...this.transformInternal<TValue>((item as any).childItems, level + 1));
      }
    }

    return result;
  }
}
