import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { SpotifyService } from '../spotify.service'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  @Input()
  id: string;
  album: SpotifyApi.AlbumObjectFull = null;
  tracks: SpotifyApi.TrackObjectSimplified[] = [];
  audio: HTMLAudioElement = new Audio();

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p["id"];
      this.spotify.getAlbum(this.id).subscribe(x => {
        this.album = x;
        while(this.tracks.length > 0) this.tracks.pop();
        this.tracks.push(...x.tracks.items);
      });
    });
  }

  play = (track: SpotifyApi.TrackObjectSimplified) => {
    this.audio.pause();
    if (this.audio.src != track.preview_url) {
      this.audio.src = track.preview_url;
      this.audio.play();
    } else {
      this.audio.src = '';
    }
  }

  albumArtists = () =>
    !this.album ? '' : this.album.artists.map(a => a.name).join(", ");
    
  albumLength = () =>
    this.timeString(this.tracks.reduce((sum, x) => sum + x.duration_ms, 0));

  trackLength = (track: SpotifyApi.TrackObjectSimplified) =>
    this.timeString(track.duration_ms);

  timeString = (ms: number) => {
    const minutes = Math.round((ms/(1000 * 60)) % 60);
    const hours = Math.round((ms/(1000 * 60 * 60)) % 24);
    return hours <= 0 ? "" : (hours + " hour" + (hours > 1 ? "s": "")+ ", ") + minutes + " minute" + (minutes > 1 ? "s": "");
  }
}
