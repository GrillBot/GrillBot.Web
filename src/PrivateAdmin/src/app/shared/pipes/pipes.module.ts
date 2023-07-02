import { CutPipe } from './cut.pipe';
import { DurationPipe } from './duration.pipe';
import { DateTimeFormatterPipe } from './date-time-formatter.pipe';
import { CzechBooleanPipePipe } from './czech-boolean-pipe.pipe';
import { BitmaskToStringPipe } from './bitmask-to-string.pipe';
import { NgModule } from '@angular/core';
import { TimeDurationPipe } from './time-duration.pipe';
import { NumberWithSpacesPipe } from './spaced-number.pipe';

@NgModule({
    declarations: [
        BitmaskToStringPipe,
        CzechBooleanPipePipe,
        DateTimeFormatterPipe,
        DurationPipe,
        CutPipe,
        TimeDurationPipe,
        NumberWithSpacesPipe
    ],
    exports: [
        BitmaskToStringPipe,
        CzechBooleanPipePipe,
        DateTimeFormatterPipe,
        DurationPipe,
        CutPipe,
        TimeDurationPipe,
        NumberWithSpacesPipe
    ]
})
export class PipesModule { }
