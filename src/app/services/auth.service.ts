import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Manager } from './manager.service';


const STORAGE_KEY = 'currentToken';
const STORAGE_KEY_USER = 'currentUser';


@Injectable()
export class AuthService {
  private baseURI = '/auth'
  constructor(
    private http: HttpClient,
  ) { }

  login (username: string, password: string) {
    let uri = `${environment.APIHost}${this.baseURI}/login`;
    let body = { username: username, password: password };
    return this.http.post(uri, body).pipe(
      map(res => {
        if (res && res['token']) {
          localStorage.setItem(STORAGE_KEY, res['token']);
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(res['me']));
          return true;
        }

        return false;
      })
    );
    /*
    map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        }
    });*/
  }


  getToken(): string {
    return localStorage.getItem(STORAGE_KEY);
  }

  get me (): Manager {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
    return Manager.from(data);
  }

  get authorizationHeader () {
    return this.getAuthorizationHeader();
  }

  logout() {
    let uri = `${environment.APIHost}${this.baseURI}/logout`;

    return this.http.get(uri).pipe(
      map(res => {
        // remove user from local storage to log user out
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY_USER);

        return res;
      })
    );
  }




  getAuthorizationHeader () {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      Accept: 'application/json'
    }
  }

}
