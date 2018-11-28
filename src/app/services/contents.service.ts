import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import {
  Category, CreatedResponse, Content, AssetFile, ContentBrief, SimpleResponse
} from 'app/models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { toSnakeCaseDict, ListResponse, toCamelCaseDict } from './backend.service';

interface ListResponseCategory{
  response: string;
  items: Category[];
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

  getList (query?: any, offset?: number, perPage?: number) {
    return this.http.get<ListResponse<ContentBrief>>(this.backend, {params: {
      offset: offset.toString(),
      page_size: perPage.toString()
    }});
  }

  getDetail (id: number) {
    return this.http.get<any>(`${this.backend}/${id}`).pipe(
      map(res => Content.from(toCamelCaseDict(res.detail)))
    );
  }

  removeAsset (content: Content, item: AssetFile) {
    let uri = `${this.backend}/${content.id}/assets/${item.id}`;
    return this.http.delete<any>(uri);
  }

  addAsset (content: Content, item: AssetFile) {

  }

  remove (id: number) {
    return this.http.delete(`${this.backend}/${id}`);
  }

  update (content: Content) {
    let uri = `${this.backend}/${content.id}`;
    let data = toSnakeCaseDict(content);
    return this.http.put(uri, data);
  }
}
