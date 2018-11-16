import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumerate'
})
export class EnumeratePipe implements PipeTransform {

  transform(value: Object, args?: any): any {
    let items = [];
    for (let key in value) {
      items.push({key: key, value: value[key]});
    }
    return items;
  }

}
