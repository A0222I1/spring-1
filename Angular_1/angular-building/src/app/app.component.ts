import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRouteSnapshot, ResolveEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly title: Title, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.setupTitleListener();
  }

  private setupTitleListener() {
    this.router.events.pipe(filter(e => e instanceof ResolveEnd)).subscribe((e: ResolveEnd) => {
      const {data} = this.getDeepestChildSnapshot(e.state.root);
      if (data?.title) {
        console.log(data.title);
        this.title.setTitle(data.title);
      }
    });
  }


  getDeepestChildSnapshot(snapshot: ActivatedRouteSnapshot) {
    let deepestChild = snapshot.firstChild;
    while (deepestChild?.firstChild) {
      deepestChild = deepestChild.firstChild;
    }
    return deepestChild || snapshot;
  }
}

