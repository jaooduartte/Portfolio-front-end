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

export const SKILLS: ReadonlyArray<SkillCard> = [
  {
    name: SkillNameEnum.HtmlCss,
    percent: 100,
    progress: SkillProgressEnum.High,
  },
  {
    name: SkillNameEnum.Tailwind,
    percent: 90,
    progress: SkillProgressEnum.High,
  },
  {
    name: SkillNameEnum.JavaScript,
    percent: 90,
    progress: SkillProgressEnum.High,
  },
  { name: SkillNameEnum.React, percent: 90, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.Next, percent: 90, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.C, percent: 45, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.CSharp, percent: 30, progress: SkillProgressEnum.Low },
  { name: SkillNameEnum.Php, percent: 70, progress: SkillProgressEnum.Medium },
  { name: SkillNameEnum.Flutter, percent: 40, progress: SkillProgressEnum.Low },
  {
    name: SkillNameEnum.Angular,
    percent: 80,
    progress: SkillProgressEnum.High,
  },
  { name: SkillNameEnum.Sql, percent: 95, progress: SkillProgressEnum.High },
  { name: SkillNameEnum.Github, percent: 100, progress: SkillProgressEnum.High },
  {
    name: SkillNameEnum.Figma,
    percent: 60,
    progress: SkillProgressEnum.Medium,
  },
  { name: SkillNameEnum.Jira, percent: 95, progress: SkillProgressEnum.High },
  {
    name: SkillNameEnum.ReactNative,
    percent: 60,
    progress: SkillProgressEnum.Medium,
  },
];
