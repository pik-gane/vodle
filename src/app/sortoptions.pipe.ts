import { Pipe, PipeTransform } from '@angular/core';
import { Option } from "./global.service";

@Pipe({
  name: 'sortoptions',
//  pure: false
})
export class SortoptionsPipe implements PipeTransform {

  transform(array: Array<string>, args?: any): any {
    function cmp(oid1, oid2) {
      if (args.opos[oid1]) {
        return args.opos[oid1] - args.opos[oid2];
      } else {
        return 0;
      }
    }
    return array.sort(cmp);
  }

}
