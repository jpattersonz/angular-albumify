/// <reference path="../../node_modules/@types/spotify-api/index.d.ts" />
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  title = 'we sorta like music';

  back = () => {
    console.log("route", this.route);
    console.log("router", this.router);
  }

  routeUrl = () => this.router.routerState.snapshot.url;

}
