import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import {CommonBackendService} from './backend.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DistrictSearchService {

  constructor(
    private http: HttpClient,
    private backend: CommonBackendService
  ) { }

  search (term: string) {
    let uri = environment.APIHost + '/address?q=' + term;
    return this.http.get<any>(uri)
      .pipe(
        catchError(this.backend.handleError),
        map(res => res.list)
      );
  }


  static compareCode (a, b) {
    if (a.code < b.code) return -1;
    if (b.code < a.code) return 1;
    return 0;
  }

}
