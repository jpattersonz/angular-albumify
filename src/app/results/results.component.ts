import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input()
  query: string;

  albums: SpotifyApi.AlbumObjectSimplified[] = null;
  selected: SpotifyApi.AlbumObjectSimplified = null;
  albumDetail: SpotifyApi.AlbumObjectFull = null;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.query = p["query"];
      this.spotify.search(this.query).subscribe(x => {
        this.albums = x.albums.items;
      });
    });
  }

  toggle = (album: SpotifyApi.AlbumObjectSimplified) => {
    if (album === this.selected) {
      this.selected = null;
      this.albumDetail = null;
    } else {
      this.selected = album;
      this.spotify.getAlbum(album.id).subscribe(x => this.albumDetail = x);
    }
  }

  albumLength = (albumDetail: SpotifyApi.AlbumObjectFull) =>
    this.timeString(albumDetail.tracks.items.reduce((sum, x) => sum + x.duration_ms, 0));

  trackLength = (track: SpotifyApi.TrackObjectSimplified) =>
    this.timeString(track.duration_ms);

  timeString = (ms: number) => {
    const minutes = Math.round((ms/(1000 * 60)) % 60);
    const hours = Math.round((ms/(1000 * 60 * 60)) % 24);
    return hours <= 0 ? "" : (hours + " hour" + (hours > 1 ? "s": "")+ ", ") + minutes + " minute" + (minutes > 1 ? "s": "");
  }

  previewUrl = (albumDetail: SpotifyApi.AlbumObjectFull) => {
    const length = albumDetail.tracks.items.length;
    const index = Math.round(Math.random() * length) || 1;
    return albumDetail.tracks.items[index].preview_url;
  }
}
