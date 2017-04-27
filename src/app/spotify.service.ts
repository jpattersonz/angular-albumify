/// <reference path="../../node_modules/@types/spotify-api/index.d.ts" />
import { Injectable } from '@angular/core';
import { Http, Headers, } from '@angular/http';

@Injectable()
export class SpotifyService {

  constructor(private http: Http) { }

  search = (query: string) => 
    this.http.get('https://api.spotify.com/v1/search?q='+query.split(',').map(x => '"' + x.trim() + '"').join(" OR ")+'&type=album', {
      headers: new Headers({
        'Accept': 'application/json'
      })
    })
    .map(response => response.json() as SpotifyApi.AlbumSearchResponse); // TODO: follow the paging

  getAlbum = (id: string) => 
    this.http.get('https://api.spotify.com/v1/albums/' + id, {
      headers: new Headers({
        'Accept': 'application/json'
      })
    })
    .map(response => response.json() as SpotifyApi.AlbumObjectFull); // TODO: follow the paging
}
