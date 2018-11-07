import { NgModule } from '@angular/core';
import { DisplayPathPipe } from './display-path/display-path';
import { KeyvaluePipe } from './keyvalue/keyvalue';
import { CalculatePipe } from './calculate/calculate';
@NgModule({
	declarations: [DisplayPathPipe,
    KeyvaluePipe,
    CalculatePipe],
	imports: [],
	exports: [DisplayPathPipe,
    KeyvaluePipe,
    CalculatePipe]
})
export class PipesModule {}
