import { CutPipe } from './cut.pipe';
import { DurationPipe } from './duration.pipe';
import { NgModule } from '@angular/core';
import { TimeDurationPipe } from './time-duration.pipe';
import { NumberWithSpacesPipe } from './spaced-number.pipe';

@NgModule({
    declarations: [
        DurationPipe,
        CutPipe,
        TimeDurationPipe,
        NumberWithSpacesPipe
    ],
    exports: [
        DurationPipe,
        CutPipe,
        TimeDurationPipe,
        NumberWithSpacesPipe
    ]
})
export class PipesModule { }
