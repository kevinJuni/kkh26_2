import { Injectable, ViewChild } from '@angular/core';
import { Manager } from './manager.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { environment } from 'environments/environment';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class PostManagerService {


  posts: PostDataElement[] = [];


  constructor(public http: HttpClient) { }
  readonly url = `${environment.APIHost}/posts`;

  getFaq() {
    return this.http.get<any>(this.url + '/faq');
  }

  date() {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var date = Date.now();
    return date;
  }


  addPost(data: any) {
    return this.http.post(this.url, data);
    // this.posts.push(data);
    // for (var i = 0; i < this.posts.length; i++) {
    //   this.posts[i].id = i + 1;
    // };
  }
  updatePost (e,body) {
    return this.http.put(`${this.url}/${e}`, body)
    // this.posts[i].subject = data.subject;
    // this.posts[i].content = data.content;
    // this.posts[i].updated_at = this.date();
  }
  getContent(e) {
    return this.http.get<any>(`${this.url}/${e.id}`)
  }
  removePost(e: number) {
    return this.http.delete(`${this.url}/${e}`);
  }




  getNotice() {
    return this.http.get<any>(this.url + '/notice');
  }
}



export class PostType {
  constructor(
    public id: number,
    public name: string
  ) {}

  static from (raw: any) {
    return new PostType(raw.id, raw.name);
  }
}

export interface PostDataElement {
  id?: number;
  created_at: string;
  updated_at: string;
  hash: string;
  subject: string;
  content: string;
  type: PostType;
  author: Manager;
}

export class Post {
  constructor(
    public id: number,
    public created_at: Date,
    public updated_at: Date,
    public hash: string,
    public subject: string,
    public content: string,
    public type: PostType,
    public author: Manager
  ) {}

  static from (raw: any) {
    return new Post(
      raw.id,
      new Date(raw.created_at),
      new Date(raw.updated_at),
      raw.hash,
      raw.subject,
      raw.content,
      raw.type ? PostType.from(raw.type) : null,
      raw.author ? Manager.from(raw.author) : null
    );
  }
}
