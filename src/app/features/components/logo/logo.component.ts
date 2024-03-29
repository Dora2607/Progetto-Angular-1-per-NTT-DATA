import { Component } from '@angular/core';
import { trigger, style, animate, state, transition} from '@angular/animations';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [style({ opacity: 0, transform: 'scale(0)' }), animate('1s ease-in-out')]),
      transition(':leave', animate('1s ease-in-out', style({ opacity: 0, transform: 'scale(0)' }))),
    ]),
  ],
})
export class LogoComponent {
  logo = 'CityGuard'
  logoCity = ["City"]
  logoGuard =["Guard"]

  constructor() {}
 
}
