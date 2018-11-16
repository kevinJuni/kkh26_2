import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CommonBackendService, ListResponse, toSnakeCaseDict } from './backend.service';
import { Ad } from 'app/models/ad_item.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class AdService {

  constructor(
    private http: HttpClient,
    private backend: CommonBackendService,
  ) { }

  getList (page: number, query?: string) {
    page = page || 1;
    let uri = `${environment.APIHost}/ads`;

    let params = {
      page: page.toString(),
      q: query
    }

    return this.http.get<any>(uri, {params: params})
      .pipe(catchError(this.backend.handleError));
  }


  getDetail (id: number) {
    let uri = `${environment.APIHost}/ads/${id}`;
    return this.http.get(uri).pipe(
      map(res => Ad.from(res) )
    );
  }

  update (id: number, data) {
    let uri = `${environment.APIHost}/ads/${id}`;

    let converted = toSnakeCaseDict(data);

    return this.http.post(uri, converted)
      .pipe(catchError(this.backend.handleError));
  }


  getDeliveryList (adId: number, query: any, page: number) {
    page = page || 1;

    let params = {
      page: page.toString()
    }

    if (query) {
      params = Object.assign(toSnakeCaseDict(query), params);
    }

    let uri = `${environment.APIHost}/ads/${adId}/delivery`;
    return this.http.get<any>(uri, {params: params})
    .pipe(
      catchError(this.backend.handleError),
      map(res => {
        return {
          list: res.list.map(AdDelivery.from),
          total: res.total, 
          pageSize: res.per_page
        }
      })
    );
  }


  chargeStock (ad: Ad, payload: StockPayload) {
    let uri = `${environment.APIHost}/ads/${ad.id}/stock`;
    let body = toSnakeCaseDict(payload);
    return this.http.put<any>(uri, body);
  }


  getPaymentLog (query?: any, page?) {
    page = page || 1;

    let params = {
      page: page.toString()
    }

    if (query) {
      params = Object.assign(toSnakeCaseDict(query), params);
    }

    let uri = `${environment.APIHost}/ads/payments`;
    return this.http.get<any>(uri, {params: params}).pipe(
      catchError(this.backend.handleError),
      map(res => {
        return {
          list: res.list.map(AdPayment.from),
          total: res.total, 
          pageSize: res.per_page
        }
      }));
  }


}


export type StockPayload = {
  amount: number,
  cost: number,
  paidQuantity: number,
  bonusQuantity: number,
  totalQuantity: number
};

export class AdPayment {
  constructor (
    public id: number,
    public action: string,
    public owner: any,
    public ad: any,
    public cost: number,
    public quantity: number,
    public bonusQuantity: number,
    public amount: number,
    public postedAt: Date,
    public settledAt: Date
  ) {}

  static from (raw) {
    return new AdPayment(
      raw.id, raw.action, raw.owner, raw.ad, raw.cost,
      raw.quantity, raw.bonusQuantity,
      raw.amount,
      raw.posted_at? moment.utc(raw.posted_at).toDate(): null,
      raw.settled_at? moment.utc(raw.settled_at).toDate(): null
    )
  }
}


export interface MemberSimpleOutline {
  id: number;
  name: string;
  district: string;
}


export class AdDelivery {
  constructor (
    public id: number,
    public postedAt: Date,
    public member: MemberSimpleOutline,
    public remainQuantity: number,
    public couponCode: string,
    public CostTypeCaption: string,
  ) {}

  static from (raw) {
    return new AdDelivery (
      raw.id, moment(raw.posted_at).toDate(),
      raw.member, raw.quantity, raw.coupon_code, raw.cost_type
    );
  }
}