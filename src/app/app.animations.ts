
import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition() {
  return slideToLeft();
}

function slideToLeft() {
  return trigger('routerTransition', [
    state('void', style({ position:'relative', width: '100%', height: '100%' }) ),
    state('*', style({ position:'relative', width: '100%', height: '100%' }) ),
    transition(':enter', [
      style({ left: '100%' }),
      animate('0.3s ease-in-out', style({ left: '0%' }))
    ]),
    // transition(':leave', [
    //   style({ left: '0%' }),
    //   animate('0.3s ease-in-out', style({ left: '-100%' }))
    // ])
  ]);
}