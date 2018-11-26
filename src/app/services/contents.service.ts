import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Category, CreatedResponse, Content } from 'app/models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { toSnakeCaseDict, ListResponse } from './backend.service';

interface ListResponseCategory{
  response: string;
  items: Category[];
}

interface SimpleResponse {
  response: string;
}

export interface ContentBrief {
  id: number;
  name: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  readonly backend = `${environment.APIHost}/contents`;

  constructor(private http: HttpClient) { }

  getCategories () {
    return this.http.get<ListResponseCategory>(`${this.backend}/categories`);
  }

  addCategory(item: Category) {
    return this.http.post<CreatedResponse>(`${this.backend}/categories`, item)
    .pipe(map(res => {
      if (res.response == 'ok')
        item.id = res.id;
      return res;
    }));
  }

  updateCategoriesSorting (now: Category[]) {
    var list = now.map(e => ({id: e.id, sorting: e.sorting}));
    return this.http.put(`${this.backend}/categories/sorting`, list);
  }

  removeCategory (item: Category) {
    return this.http.delete(`${this.backend}/categories/${item.id}`);
  }
  

  verifyContent (item: Content): Observable<SimpleResponse> {
    return this.http.post<SimpleResponse>(`${this.backend}/verify`, item);
  }

  addContent (item: Content) {
    let data = toSnakeCaseDict(item);
    return this.http.post(this.backend, data);
  }

  getList () {
    return this.http.get<ListResponse<ContentBrief>>(this.backend);
  }
}
