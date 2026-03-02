import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

enum SkillProgressEnum {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

enum SkillNameEnum {
  HtmlCss = 'HTML/CSS',
  Tailwind = 'Tailwind',
  JavaScript = 'Java Script',
  React = 'React',
  Next = 'Next',
  C = 'C',
  CSharp = 'C#',
  Php = 'PHP',
  Flutter = 'Flutter',
  Angular = 'Angular',
  Sql = 'SQL',
  Github = 'Github',
  Figma = 'Figma',
  Jira = 'JIRA',
  ReactNative = 'React Native',
}

type SkillCard = {
  name: SkillNameEnum;
  percent: number;
  progress: SkillProgressEnum;
};

const SKILLS: ReadonlyArray<SkillCard> = [
  { name: SkillNameEnum.HtmlCss, percent: 85, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.Tailwind, percent: 60, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.JavaScript, percent: 70, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.React, percent: 80, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.Next, percent: 80, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.C, percent: 45, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.CSharp, percent: 30, progress: SkillProgressEnum.Low },
  { name: SkillNameEnum.Php, percent: 40, progress: SkillProgressEnum.Low },
  { name: SkillNameEnum.Flutter, percent: 40, progress: SkillProgressEnum.Low },
  { name: SkillNameEnum.Angular, percent: 60, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.Sql, percent: 90, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.Github, percent: 90, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.Figma, percent: 60, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.Jira, percent: 90, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.ReactNative, percent: 5, progress: SkillProgressEnum.Low },
];

@Component({
  selector: 'app-skills',
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly skillsLoop: ReadonlyArray<SkillCard> = [...SKILLS, ...SKILLS];
}
