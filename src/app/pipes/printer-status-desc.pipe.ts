import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'printerStatusDesc'
})
export class PrinterStatusDescPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return value == 0 ? '출력가능' : '출력불가';
  }

}
