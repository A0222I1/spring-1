import {Component, OnInit} from '@angular/core';
import {NewsService} from './service/news.service';
import {News} from './model/news';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  listNews: News[] = [];

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.findAll().subscribe(data => {
      this.listNews = data;
    }, error => {
      console.log("err");
    });
  }

}
