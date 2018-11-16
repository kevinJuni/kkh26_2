import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';

import { Observable } from 'rxjs';


@Injectable()
export class CommonBackendService {
  readonly ServiceHost = 'http://localhost:5000';
  readonly ImageHost = 'https://pharmplus.biz';

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}


export function toCamelCase (text) {
  return text.replace(/(_\w)/g, m => m[1].toUpperCase());
}


export function toSnakeCase (text: string): string {
  return text.replace(/([A-Z])(\w)/g, m => '_' + m[0].toLowerCase() + m[1]);
}


export function toCamelCaseDict (data) {
  let out = {};
  
  for (let field in data) {
    if (typeof data[field] == 'object' && !Array.isArray(data[field])) {
      out[toCamelCase(field)] = toCamelCaseDict(data[field])
    } else {
      out[toCamelCase(field)] =  data[field];
    }
  }

  return out;
}
export function toSnakeCaseDict (data) {
  let out = {};
  
  for (let field in data) {
    if (data[field] === null)
      continue;

    if (data[field] instanceof Date) {
      out[toSnakeCase(field)] = (<Date>data[field]).toISOString();
    } else if (typeof data[field] == 'object' && !Array.isArray(data[field])) {
      out[toSnakeCase(field)] = toSnakeCaseDict(data[field])
    } else {
      out[toSnakeCase(field)] =  data[field];
    }
  }

  return out;
}



export interface PageParam {
  page: number;
  perPage: number;
}


export class PageParamImpl {

  constructor(
    public page: number,
    public perPage: number,
  ){}


  static from (obj: PageParam) {
    return new PageParamImpl(obj.page, obj.perPage);
  }


  get serialized () {
    return {
      page: this.page.toString(),
      per_page: this.perPage.toString()
    }
  }

}

export interface ListResponse<T> {
  list: T[];
  total: number;
  per_page: number;
}


export class EnumOption {
  constructor(
    public value: any,
    public caption: string,
  ){}

  // Many target selecting components depends on this property so be careful
  get isAll (): boolean {
    return this.caption == '전체' && this.value <= 0;
  }
}