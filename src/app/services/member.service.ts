import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

import {Member, District} from 'app/models/member.model';
import {MemberComment} from 'app/models/member_comment.model';
import {ClientDevice} from 'app/models/member_device.model';
import {environment} from '../../environments/environment';
import {
  CommonBackendService, ListResponse, toSnakeCaseDict
} from './backend.service';
import * as moment from 'moment';

@Injectable()
export class MemberService {
  private static readonly baseURI = `${environment.APIHost}/members`;
  
  memberStatusUpdated = new EventEmitter();
  clientReportsReserved = new EventEmitter();
  advertiserStatusUpdated = new EventEmitter();

  get authToken () {
    return 'InNlc3MtQWRtaW4tMTAi.C5E1Dg.yDxSRc8KSJTuKT6xeROHCY0my1M';
  }

  constructor(
    private http: HttpClient,
    private common: CommonBackendService,
  ) { }
  

  getMemberList (query, page: number): Observable<ListResponse<Member>> {
    //return Promise.resolve(MemberMock);
    page = page || 1;
    let uri = `${environment.APIHost}/members`;

    let params = {
      page: page.toString()
    }

    if (query) {
      params = Object.assign(toSnakeCaseDict(query), params);
    }

    return this.http.get<any>(MemberService.baseURI, {params: params})
      .pipe(
        catchError(this.common.handleError),
        map(res => {
          return {
            list: res.list.map(item => Member.from(item)),
            per_page: res.per_page,
            total: res.total,
          };
        })
      );
  }


  updateMember (id: number, data) {
    let uri = `${MemberService.baseURI}/${id}`;

    let converted = toSnakeCaseDict(data);

    return this.http.put(uri, converted);
  }


  getCommentList (memberId: number, page :number): Observable<ListResponse<MemberComment>> {
    page = page || 1;
    let uri = `${MemberService.baseURI}/${memberId}/comments`;

    return this.http.get<any>(uri)
      .pipe(
        catchError(this.common.handleError),
        map(res => {
          return {
            list: res.list.map(item => MemberComment.from(item)),
            per_page: res.page_size,
            total: res.total,
          }
        })
      );
  }


  addComment (memberId: number, comment: any) {
    let uri = `${MemberService.baseURI}/${memberId}/comments`;
    return this.http.post(uri, comment)
      .pipe(catchError(this.common.handleError));
  }


  updateComment (memberId: number, comment: any) {
    let uri = `${MemberService.baseURI}/${memberId}/comments/${comment.id}`;
    return this.http.put(uri, comment)
      .pipe(catchError(this.common.handleError));
  }


  deleteComment (memberId: number, comment: MemberComment) {
    let uri = `${MemberService.baseURI}/${memberId}/comments/${comment.id}`;
    return this.http.delete(uri)
      .pipe(catchError(this.common.handleError));
  }

  
  getHistoryList (memberId: number, page?: number) {
    page = page || 1;
    let uri = `${MemberService.baseURI}/${memberId}/history`;
    let params = {
      page: page.toString()
    }

    return this.http.get<any>(uri, {params: params})
      .pipe(catchError(this.common.handleError));
  }


  getDeviceList (memberId: number) {
    let uri = `${MemberService.baseURI}/${memberId}/devices`;
    return this.http.get<any>(uri)
      .pipe(catchError(this.common.handleError));
  }

  getDeviceReport (device: ClientDevice) {
    
  }


  disableDevice(device: ClientDevice) {
    let uri = MemberService.baseURI + 'device/' + device.id + '/disabled';
    uri = `${MemberService.baseURI}/${device.ownerId}/devices/${device.id}/disabled`;
    return this.http.get(uri)
      .pipe(catchError(this.common.handleError));
  }


  updateMemberStatus (member: Member) {
    let uri = `${MemberService.baseURI}/${member.id}/disabled`;

    let req = {
      status: member.status? 0: 1
    };
    return this.http.put<any>(uri, req)
      .pipe(
        catchError(this.common.handleError),
        map(res => {
          setTimeout(() => this.memberStatusUpdated.emit(), 100);
          return res;
        })
      );
  }


  getDetailInfo (memberId: number) {
    let uri = `${environment.APIHost}/members/${memberId}`;
    return this.http.get(uri)
      .pipe(catchError(this.common.handleError));
  }

  getReadyDeviceReport (memberId: number) {
    let uri = `${MemberService.baseURI}/${memberId}/ready-to-report`;
    return this.http.get(uri)
      .pipe(catchError(this.common.handleError));
  }


  getValidationURI () {
    return MemberService.baseURI + '/validate';
  }



  getAdvertiserList (pageParams?, query?): Observable<ListResponse<Advertiser>> {
    let uri = `${environment.APIHost}/ad-owners`;

    return this.http.get<any>(uri)
    .pipe(
      catchError(this.common.handleError),
      map(res => {
        return {
          list: res.list.map(Advertiser.from),
          total: res.total,
          per_page: res.per_page
        }
      })
    );
  }

  getAdvertiser (id: number) {
    let uri = `${environment.APIHost}/ad-owners/${id}`;

    return this.http.get<any>(uri)
      .pipe(
        catchError(this.common.handleError),
        map(res => Advertiser.from(res))
      );
  }


  updateAdvertiserStatus (member: Advertiser) {
    let uri = `${environment.APIHost}/ad-owners/${member.id}`;
    let req = {
      status: member.status? 0: 1
    };

    return this.http.put(uri, req)
      .pipe(
        catchError(this.common.handleError),
        map(res => {
          setTimeout(() => this.advertiserStatusUpdated.emit(), 100);
          return res;
        })
      );
  }


  updateAdvertiser (id: number, data: any) {
    let uri = `${environment.APIHost}/ad-owners/${id}`;

    let converted = toSnakeCaseDict(data);
    return this.http.put(uri, converted)
      .pipe(catchError(this.common.handleError));
  }
}





export class Advertiser {

  constructor (
    public id: number,
    public registeredAt: Date,
    public userName: string,
    public name: string,
    public brn: string,
    public phone: string,
    public email: string,
    public agencyName: string,
    public status: number,
    public address: string,
    public addressDetail: string,
    public logDate: Date
  ){}

  static from (raw) {
    return new Advertiser (
      raw.id, moment.utc(raw.registered_at).toDate(),
      raw.username, raw.name, raw.brn,
      raw.phone, raw.email, raw.agency, raw.status,
      raw.address1, raw.address2,
      raw.log_date ? moment.utc(raw.log_date).toDate() : null
    )
  }

  get isEnabled () { return this.status === 1; }
  
}