import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberStatusDesc'
})
export class MemberStatusDescPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value == 1 ? '정상' : '이용정지';
  }

}
