import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceServiceStatusDesc'
})
export class DeviceServiceStatusDescPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value == 0 ? '정상' : '동작실패';
  }

}
