import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'props',
  standalone: true
})
export class PropsPipe implements PipeTransform {
  transform(value: any | any[], ...args: string[]) {
    if (!Array.isArray(value)) {
      value = [value];
    }

    return (value as any[]).map(o => o[args[0]]).join(', ');
  }
}
