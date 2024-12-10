import { Component } from '@angular/core';
import { CardProfileComponent } from './components/card-profile/card-profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CardProfileComponent],
})
export class AppComponent {}