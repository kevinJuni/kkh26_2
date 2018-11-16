import { Pipe, PipeTransform } from '@angular/core';

import { Orientation } from 'app/models/printer-device.model';

@Pipe({
  name: 'printerOrientationCaption'
})
export class PrinterOrientationCaptionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value == 1? '세로': '가로';
  }

}
