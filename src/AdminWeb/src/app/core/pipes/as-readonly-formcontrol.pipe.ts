import { Pipe, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";

@Pipe({
  name: 'asReadonlyFormControl',
  standalone: true
})
export class AsReadonlyFormControlPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    const control = new FormControl(value);
    control.disable();

    return control;
  }
}
