import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  baseUrl = 'http://localhost/zoomtrack/backend/app/news';
  constructor(private http: HttpClient) { }

  getNews(init, final) {
    return this.http.get(this.baseUrl + '/limit/' + init + '/' + final).toPromise();
  }

}
