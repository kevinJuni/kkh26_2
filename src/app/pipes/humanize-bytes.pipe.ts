import { Pipe, PipeTransform } from '@angular/core';

import { humanizeBytes } from 'ngx-uploader';

@Pipe({
  name: 'humanizeBytes'
})
export class HumanizeBytesPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return humanizeBytes(value);
  }

}
