import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SpotifyService } from './spotify.service';
import { SearchComponent } from './search/search.component';
import { AlbumComponent } from './album/album.component';
import { ResultsComponent } from './results/results.component';

const appRoutes: Routes = [
  { path: 'album/:id', component: AlbumComponent },
  {
    path: 'results/:query',
    component: ResultsComponent,
    data: { title: 'Search Results' }
  },
  { path: '', component: SearchComponent, },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AlbumComponent,
    ResultsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
