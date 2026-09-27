enum ProjectNameEnum {
  SoftwareIpj = 'SoftwareIPJ',
  AtleticaEngenios = 'Atletica Engenios',
  Laje = 'LAJE',
  RodApp = 'RodApp',
}

enum ProjectViewModeEnum {
  Web = 'web',
  Mobile = 'mobile',
}

enum ProjectCodeEnum {
  SoftwareIpj = 'software-ipj',
  AtleticaEngenios = 'atletica-engenios',
  Laje = 'laje',
  RodApp = 'rodapp',
}

enum ProjectTitleColorEnum {
  Default = 'default',
  DarkRed = 'dark-red',
  LightRed = 'light-red',
  DarkGray = 'dark-gray',
}

enum ProjectLinkLabelEnum {
  Project = 'Projeto',
  Github = 'GitHub',
}

type ProjectLink = {
  label: ProjectLinkLabelEnum;
  url: string;
};

export type ProjectScreenshot = {
  imagePath: string;
  imageAlt: string;
};

export type ProjectCard = {
  code: ProjectCodeEnum;
  name: ProjectNameEnum;
  titleColor: ProjectTitleColorEnum;
  summary: string;
  technologies: ReadonlyArray<string>;
  conclusion: string;
  links: ReadonlyArray<ProjectLink>;
  hasDocumentation: boolean;
  viewMode: ProjectViewModeEnum;
  screenshots: ReadonlyArray<ProjectScreenshot>;
};

export const PROJECTS: ReadonlyArray<ProjectCard> = [
  {
    code: ProjectCodeEnum.SoftwareIpj,
    name: ProjectNameEnum.SoftwareIpj,
    titleColor: ProjectTitleColorEnum.Default,
    summary:
      'Aplicativo mobile com repositório e documentação técnica disponíveis para consulta.',
    technologies: ['Flutter', 'Dart', 'Supabase'],
    conclusion: 'Dezembro/2024',
    links: [
      {
        label: ProjectLinkLabelEnum.Github,
        url: 'https://github.com/kalebefukuda/SoftwareIPJ_app',
      },
    ],
    hasDocumentation: true,
    viewMode: ProjectViewModeEnum.Mobile,
    screenshots: [
      {
        imagePath: 'assets/softwareipj.jpeg',
        imageAlt: 'Imagem do Projeto SoftwareIPJ',
      },
    ],
  },
  {
    code: ProjectCodeEnum.AtleticaEngenios,
    name: ProjectNameEnum.AtleticaEngenios,
    titleColor: ProjectTitleColorEnum.DarkRed,
    summary: 'Projeto web com demonstração pública disponível.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    conclusion: 'Projeto Web',
    links: [
      {
        label: ProjectLinkLabelEnum.Project,
        url: 'https://atleticaengenios.vercel.app/',
      },
    ],
    hasDocumentation: false,
    viewMode: ProjectViewModeEnum.Web,
    screenshots: [
      {
        imagePath: 'assets/projects/atletica-engenios/engenios.png',
        imageAlt: 'Placeholder 01 do projeto Atletica Engenios',
      },
      {
        imagePath: 'assets/projects/atletica-engenios/engenios2.png',
        imageAlt: 'Placeholder 02 do projeto Atletica Engenios',
      },
      {
        imagePath: 'assets/projects/atletica-engenios/engenios3.png',
        imageAlt: 'Placeholder 03 do projeto Atletica Engenios',
      },
    ],
  },
  {
    code: ProjectCodeEnum.Laje,
    name: ProjectNameEnum.Laje,
    titleColor: ProjectTitleColorEnum.LightRed,
    summary: 'Projeto web com demonstração pública disponível.',
    technologies: ['Next.js', 'React', 'Tailwind CSS'],
    conclusion: 'Projeto Web',
    links: [
      {
        label: ProjectLinkLabelEnum.Project,
        url: 'https://ligaatleticas.vercel.app/',
      },
    ],
    hasDocumentation: false,
    viewMode: ProjectViewModeEnum.Web,
    screenshots: [
      {
        imagePath: 'assets/projects/laje/laje01.png',
        imageAlt: 'Imagem do projeto LAJE',
      },
      {
        imagePath: 'assets/projects/laje/laje02.png',
        imageAlt: 'Imagem 02 do projeto LAJE',
      },
    ],
  },
  {
    code: ProjectCodeEnum.RodApp,
    name: ProjectNameEnum.RodApp,
    titleColor: ProjectTitleColorEnum.DarkGray,
    summary: 'Aplicativo mobile com demonstração pública disponível.',
    technologies: ['Aplicativo mobile'],
    conclusion: 'Projeto Mobile',
    links: [
      {
        label: ProjectLinkLabelEnum.Project,
        url: 'https://rodapp.vercel.app/leading',
      },
    ],
    hasDocumentation: false,
    viewMode: ProjectViewModeEnum.Mobile,
    screenshots: [
      {
        imagePath: 'assets/projects/rodapp/rodapp.png',
        imageAlt: 'Imagem 01 do projeto RodApp',
      },
      {
        imagePath: 'assets/projects/rodapp/rodapp2.png',
        imageAlt: 'Imagem 02 do projeto RodApp',
      },
      {
        imagePath: 'assets/projects/rodapp/rodapp3.png',
        imageAlt: 'Imagem 03 do projeto RodApp',
      },
    ],
  },
];
