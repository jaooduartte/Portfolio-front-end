import { Component } from '@angular/core';
import { CardProfileComponent } from './components/card-profile/card-profile.component';
import { DescriptionComponent } from "./components/description/description.component";
import { HeaderComponent } from "./components/header/header.component";
import { SkillsComponent } from "./components/skills/skills.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CardProfileComponent, DescriptionComponent, HeaderComponent, SkillsComponent],
})
export class AppComponent {}