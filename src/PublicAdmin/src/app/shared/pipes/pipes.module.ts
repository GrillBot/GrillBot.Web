import { CutPipe } from './cut.pipe';
import { CzechBooleanPipePipe } from './czech-boolean-pipe.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        CzechBooleanPipePipe,
        CutPipe
    ],
    exports: [
        CzechBooleanPipePipe,
        CutPipe
    ]
})
export class PipesModule { }
