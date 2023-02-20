import {Component, OnInit} from '@angular/core';
import {NewsService} from './service/news.service';
import {News} from './model/news';
import {PlaneService} from '../plane-module/services/plane.service';
import {Stage} from '../plane-module/model/Stage';
import {StageService} from '../plane-module/services/stage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  listNews: News[] = [];
  totalArea: number;
  stages: Stage[] = [];

  constructor(private newsService: NewsService,
              private planeServices: PlaneService,
              private stageServices: StageService) {
  }

  ngOnInit() {
    this.newsService.findAll().subscribe(data => {
      this.listNews = data;
      this.getPlane();
      this.getStage();
    }, error => {
      console.log('err');
    });
  }

  getPlane() {
    this.planeServices.getTotalArea().subscribe(data => {
      this.totalArea = data;
    });
  }

  getStage() {
    this.stageServices.findAll().subscribe(data => {
      this.stages = data;
    });
  }
}
