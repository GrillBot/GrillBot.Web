import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'dictToList',
  standalone: true
})
export class DictToListPipe implements PipeTransform {
  transform<TValue>(value: { [k: string]: TValue }, ..._: any[]): { key: string, value: TValue }[] {
    return Object.keys(value).map(k => ({ key: k, value: value[k] }));
  }
}
