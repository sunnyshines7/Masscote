import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CalculatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'calculate',
})
export class CalculatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, src_attr: string, ...args) {
    if(src_attr == 'toFloat') {
      return parseFloat(value);
    }
    if(src_attr == 'toString') {
      return value.toString()
    }
    if(src_attr == 'pow'){
      return Math.pow(parseFloat(value),2);
    }
    if(src_attr == 'sqrt'){
      return Math.sqrt(parseFloat(value));
    }
    return value;
  }
}
