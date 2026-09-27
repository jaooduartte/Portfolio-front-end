import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SKILLS } from '../../game/skills.data';

@Component({
  selector: 'app-skills',
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skillsLoop: typeof SKILLS = [...SKILLS, ...SKILLS];
}
