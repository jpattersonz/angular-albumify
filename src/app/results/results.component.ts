import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { routerTransition } from '../app.animations'
import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ""},
})
export class ResultsComponent implements OnInit {
  @Input()
  query: string;

  albums: SpotifyApi.AlbumObjectSimplified[] = [];
  index = 0;
  showing = 3; // TODO: responsive design, switch to 1
  visible: SpotifyApi.AlbumObjectSimplified[] = [];

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.query = p["query"];
      this.spotify.search(this.query).subscribe(x => {
        while(this.albums.length > 0) this.albums.pop();
        this.albums.push(...x.albums.items);
        this.index = 0;
        this.fix();
      });
    });
  }

  move = (step: number) => {
    this.index += step;
    this.fix();
  }

  fix = () => {
    while(this.visible.length > 0) this.visible.pop();
    Observable.from(this.albums).skip(this.index).take(this.showing).subscribe(x => this.visible.push(x));
  }

  fetch = (show: number) => {
    //return Observable.from(this.albums).skip(this.index).take(show).subscribe(x => this.visible.push(x));
    return this.albums.slice(this.index, this.index + show);
  }

}