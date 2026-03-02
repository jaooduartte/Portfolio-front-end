import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import necessário para *ngIf

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

type ProjectScreenshot = {
  imagePath: string;
  imageAlt: string;
};

type ProjectCard = {
  code: ProjectCodeEnum;
  name: ProjectNameEnum;
  titleColor: ProjectTitleColorEnum;
  technologies: string;
  conclusion: string;
  links: ReadonlyArray<ProjectLink>;
  hasDocumentation: boolean;
  viewMode: ProjectViewModeEnum;
  screenshots: ReadonlyArray<ProjectScreenshot>;
};

const PROJECTS: ReadonlyArray<ProjectCard> = [
  {
    code: ProjectCodeEnum.SoftwareIpj,
    name: ProjectNameEnum.SoftwareIpj,
    titleColor: ProjectTitleColorEnum.Default,
    technologies: 'Flutter - Dart - Supabase',
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
    technologies: 'Next.js - React - Tailwind CSS',
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
    technologies: 'Next.js - React - Tailwind CSS',
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
    technologies: 'Aplicativo Mobile',
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

@Component({
  selector: 'app-modal-projects',
  imports: [CommonModule], // Importa o CommonModule para habilitar *ngIf
  templateUrl: './modal-projects.component.html',
  styleUrl: './modal-projects.component.scss',
  standalone: true, // Certifica-se de que é um componente standalone
})
export class ModalProjectsComponent {
  @Input() isVisible: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  readonly projects: ReadonlyArray<ProjectCard> = PROJECTS;

  isClosing: boolean = false;
  selectedImage: ProjectScreenshot | null = null;

  closeModal() {
    this.selectedImage = null;
    this.isClosing = true; // Ativa a animação de saída
    setTimeout(() => {
      this.isClosing = false; // Reseta o estado
      this.isVisible = false; // Esconde a modal
      this.onClose.emit(); // Emite o evento de fechamento
    }, 500); // Tempo da animação (500ms)
  }

  downloadDocument() {
    try {
      console.log('Download iniciado');
      const fileUrl = '/assets/Documentacao-Completa-IPJ.pdf';
      console.log('Caminho do arquivo:', fileUrl);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'Documentacao-Completa-IPJ.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao tentar baixar a documentação:', error);
    }
  }

  onOverlayClick() {
    if (this.selectedImage) {
      this.closeImagePreview();
      return;
    }

    this.closeModal();
  }

  openImagePreview(screenshot: ProjectScreenshot) {
    this.selectedImage = screenshot;
  }

  closeImagePreview() {
    this.selectedImage = null;
  }
}
