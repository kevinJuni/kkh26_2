import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { toSnakeCaseDict, CommonBackendService } from './backend.service';

import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient,
    private common: CommonBackendService
  ) { }


  getManagerList (query, page) {
    page = page || 1;
    let uri = `${environment.APIHost}/managers`;

    let params = {
      page: page.toString()
    }

    if (query) {
      params = Object.assign(toSnakeCaseDict(query), params);
    }

    return this.http.get<any>(uri, {params: params})
      .pipe(
        catchError(this.common.handleError), map(res => {
          return {
            list: res.list.map(item => Manager.from(item)),
            per_page: res.per_page,
            total: res.total,
          };
        })
      );
  }


  getAboutMe () {
    let uri = `${environment.APIHost}/managers/me`;
    return this.http.get<any>(uri).pipe(map(res => Manager.from(res)));
  }


  create (input: any) {
    let uri = `${environment.APIHost}/managers`;
    let data = toSnakeCaseDict(input);
    return this.http.post<any>(uri, data).pipe(catchError(this.common.handleError));
  }


  update (target: Manager, data: any) {
    let uri = `${environment.APIHost}/managers/${target.id}`;
    let converted = toSnakeCaseDict(data);
    return this.http.put<any>(uri, converted).pipe(catchError(this.common.handleError));
  }


  remove (target: Manager) {
    let uri = `${environment.APIHost}/managers/${target.id}`;
    return this.http.delete(uri).pipe(catchError(this.common.handleError));
  }
  
}



export class Manager {
  static typeCaptions = {
    1: '최고관리자',
    2: '일반관리자',
    3: '제휴사'
  };

  static statusCaptions = {
    1: '정상',
    0: '비활성'
  };

  constructor (
    public id: number,
    public registeredAt: Date,
    public userName: string,
    public name: string,
    public email: string,
    public status: number,
    public type: number,
    public company: Company
  ){}

  static from (raw: any) {
    let res = new Manager (
      raw.id, raw.registered_at,
      raw.username, raw.name, raw.email, raw.status, raw.type,
      Company.from(raw.company)
    );
    res.companyId = res.company ? res.company.id : null;
    return res;
  }


  get typeName (): string {
    return Manager.typeCaptions[this.type];
  }

  get statusCaption (): string {
    return Manager.statusCaptions[this.status];
  }


  companyId: number|null;
}


export class Company {
  constructor (
    public id: number,
    public name: string,
    public is_erp: boolean
  ) {}

  static from (raw: any) {
    return new Company(
      raw.id, raw.name, false
    )
  }
}