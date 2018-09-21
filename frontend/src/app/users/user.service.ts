import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost/zoomtrack/backend/app/users';
  headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8', 'Token' : localStorage.getItem('token')});

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post(this.baseUrl + '/login', user).toPromise();
  }

  register(user) {
    return this.http.post(this.baseUrl, user).toPromise();
  }

  getUsers(init, final) {
    return this.http.get(this.baseUrl + '/limit/' + init + '/' + final, {  headers: this.headers } ).toPromise();
  }

  updateUsers(user) {
    return this.http.put(this.baseUrl, user, {  headers: this.headers } ).toPromise();
  }

  deleteUsers(id) {
    return this.http.delete(this.baseUrl + '/' + id, {  headers: this.headers } ).toPromise();
  }

  changeState(user) {
    return this.http.put(this.baseUrl + '/state', user, {  headers: this.headers } ).toPromise();
  }
}
