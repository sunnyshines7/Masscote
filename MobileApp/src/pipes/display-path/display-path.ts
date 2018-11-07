import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DisplayPathPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'displayPath',
})
export class DisplayPathPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, src_attr: string, ...args) {
    var _src = '';
    if(src_attr == 'image') {
      _src = value.search('uploads/images') > -1 ? value : 'data:image/jpeg;base64,' + value;
    }
    return _src;
  }
}
