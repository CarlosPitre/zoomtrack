import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  baseUrl = 'http://localhost/zoomtrack/backend/app/tags';
  headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Token' : localStorage.getItem('token')});

  constructor(private http: HttpClient) { }

  getTags(init, final) {
    return this.http.get(this.baseUrl + '/limit/' + init + '/' + final, {  headers: this.headers } ).toPromise();
  }

  updateTags(tag) {
    return this.http.put(this.baseUrl, tag, {  headers: this.headers } ).toPromise();
  }

  deleteTags(id) {
    return this.http.delete(this.baseUrl + '/' + id, {  headers: this.headers } ).toPromise();
  }

  register(tag) {
    return this.http.post(this.baseUrl, tag, {  headers: this.headers }).toPromise();
  }

}
