import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter',
})
export class DataFilterPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, (row) => row.name.indexOf(query) > -1);
    }
    return array;
  }
}
