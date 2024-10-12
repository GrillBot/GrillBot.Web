import { Pipe, PipeTransform } from "@angular/core";
import { Observable, catchError, isObservable, map, of, startWith } from "rxjs";
import { RawHttpResponse, HttpResponse } from "../models/common";

@Pipe({
  name: 'withLoading',
  standalone: true,
})
export class WithLoadingPipe implements PipeTransform {
  transform<T>(value: Observable<RawHttpResponse<T>>, ..._: any[]): Observable<HttpResponse<T>> {
    if (!isObservable(value)) {
      return value;
    }

    return value.pipe(
      map((val: RawHttpResponse<T>) => ({
        loading: val.type === 'start',
        value: val.type ? val.value : value
      } as HttpResponse<T>)),
      startWith({ loading: true } as HttpResponse<T>),
      catchError(error => of({ loading: false, error }))
    );
  }
}
