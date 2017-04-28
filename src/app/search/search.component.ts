import { Component } from '@angular/core';
import { routerTransition } from '../app.animations'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ""},
})
export class SearchComponent { }