import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonBackendService, toSnakeCaseDict } from './backend.service';
import { environment } from 'environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private http: HttpClient,
    private common: CommonBackendService
  ) { }


  getList (query?, page?) {
    page = page || 1;
    let uri = `${environment.APIHost}/partners`;

    let params = {
      page: page.toString()
    }

    if (query) {
      params = Object.assign(toSnakeCaseDict(query), params);
    }

    return this.http.get<any>(uri, {params: params})
    .pipe(
      catchError(this.common.handleError),
      map(res => {
        return {
          list: res.list.map(item => Partner.from(item)),
          per_page: res.per_page,
          total: res.total,
        };
      })
    );
  }
}



export class Partner {
  constructor (
    public id: number,
    public name: string,
    public isERPVendor: boolean,
    public ERPName: string,
  ) {}

  static from (raw: any) {
    return new Partner(raw.id, raw.name, raw.is_erp_vendor, raw.erp_name);
  }
}