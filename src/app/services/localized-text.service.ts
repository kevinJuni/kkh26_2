import { Injectable } from '@angular/core';

@Injectable()
export class LocalizedTextService {

  constructor() { }

  readonly postedSuccessfully = '정상적으로 반영되었습니다.';
  readonly postedButError = '반영하는 중 오류가 발생했습니다.';

  readonly adPropertyCaption = {
    erp: ['전체', 'PM2000', 'Upharm'],
    deliveryEnv: {
      all: '전체', mono: '흑백', color: '컬러'
    },
    membership: {
      all: '전체',
      district: '지역별',
      exclusive: '가맹약국 독점'
    },
    gender: {
      all: '전체',
      male: '남',
      female: '여'
    }
  }

}
