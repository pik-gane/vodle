import { Pipe, PipeTransform } from '@angular/core';
import { Option } from "./global.service";

@Pipe({
  name: 'sortoptions'
})
export class SortoptionsPipe implements PipeTransform {

  transform(array: Array<object>, args?: any): any {
    return null;
  }

}
