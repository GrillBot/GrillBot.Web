import { Pipe, PipeTransform } from "@angular/core";
import { isObservable, Observable, of } from "rxjs";

@Pipe({
  name: 'observable',
  standalone: true
})
export class ObservablePipe implements PipeTransform {
  transform<T>(value: Observable<T> | T, ..._: any[]): Observable<T> {
    return isObservable(value) ? value : of(value);
  }
}
