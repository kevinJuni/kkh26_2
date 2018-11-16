import { Pipe, PipeTransform } from '@angular/core';

import {Color} from 'app/models/printer-device.model';

@Pipe({
  name: 'printerColorCaption'
})
export class PrinterColorCaptionPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return value == Color.Color? '컬러': '흑백';
  }

}
