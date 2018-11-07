import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeyvaluePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'keyvalue',
})
export class KeyvaluePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args: any[] = null): any {
    console.log(value);
    let keys = Object.keys;
    console.log(keys);

    '<ion-col col-4> <ion-item> <ion-label stacked class="large_label">{{item.January}}</ion-label> <ion-input type="text"></ion-input> </ion-item></ion-col>'
    // return Object.keys(value)
}
}
