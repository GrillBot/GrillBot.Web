import { KeepableParams } from './../../../core/models/selfunverify';
import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { SelfUnverifyService } from 'src/app/core/services/selfunverify.service';
import { map, switchMap } from 'rxjs/operators';

export class SelfUnverifyValidators {
    static keepableExists(service: SelfUnverifyService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            const form = control as FormGroup;
            const parameters = KeepableParams.create(form);

            return timer(300).pipe(
                switchMap(() => service.keepableExists(parameters)),
                map((result: boolean) => result ? { exists: true } : null)
            );
        };
    }
}
