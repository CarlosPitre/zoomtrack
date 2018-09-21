import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {NewsService} from './news.service';
import {New} from './new';
import {Answers} from '../shared/answers';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  profileForm = this.fb.group({
    email: [''],
    password: [''],
  });
  news: New[];

  constructor(private fb: FormBuilder, private newService: NewsService) {
    newService.getNews(0, 10).then((result: Answers) => {
      if (result.status) {
        this.news = result.news;
      } else {
        console.warn(result.message);
      }
    });
  }

  ngOnInit() {
  }

}
