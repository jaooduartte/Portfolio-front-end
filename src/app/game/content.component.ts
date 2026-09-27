import {
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CONTENT, ContentPage } from './content.data';
import { PROJECTS, ProjectCard } from './projects.data';
import { GameState, Section } from './game-state.service';

@Component({
  selector: 'app-game-content',
  standalone: true,
  template: `
    @if (section === 'projects' && !project) {
      <div class="eyebrow">SELECIONE UM PROJETO</div>
      <div class="project-list">
        @for (item of projects; track item.code; let index = $index) {
          <button
            (click)="openProject(item)"
            [class.selected]="selectedProject === index"
          >
            <span>0{{ index + 1 }}</span
            ><strong>{{ item.name }}</strong
            ><span>↗</span>
          </button>
        }
      </div>
      <p class="small">Quatro projetos. Diferentes soluções.</p>
    } @else {
      <div class="reading">
        <div class="eyebrow">
          {{ project?.name || sectionLabel }} · {{ pageIndex + 1 }}/{{
            pages.length
          }}
        </div>
        <h2>{{ current.title }}</h2>
        <div class="page-body" #body>
          @if (current.text) {
            <p>{{ current.text }}</p>
          }
          @if (current.progress !== undefined) {
            <div class="skill-progress">
              <div class="skill-progress-heading">
                <span>Nível atual</span><strong>{{ current.progress }}%</strong>
              </div>
              <div
                class="skill-progress-track"
                role="progressbar"
                [attr.aria-label]="'Nível atual em ' + current.title"
                aria-valuemin="0"
                aria-valuemax="100"
                [attr.aria-valuenow]="current.progress"
              >
                <span [style.width.%]="current.progress"></span>
              </div>
              <p class="skill-progress-caption">0% <span>100%</span></p>
            </div>
          }
          @if (current.image) {
            <button
              class="image-button"
              (click)="openPreview(current.image, current.alt || current.title)"
              aria-label="Ampliar imagem"
            >
              <img [src]="current.image" [alt]="current.alt" /><span
                >+ Ampliar</span
              >
            </button>
          }
          @for (link of current.links || []; track link.url) {
            <a
              [href]="link.url"
              [attr.download]="link.download || null"
              [attr.target]="link.url.startsWith('https:') ? '_blank' : null"
              rel="noopener noreferrer"
              >{{ link.label }}</a
            >
          }
        </div>
        <nav class="pagination" aria-label="Páginas do conteúdo">
          <button
            aria-label="Página anterior"
            (click)="previous()"
            [disabled]="pageIndex === 0"
          >
            ←</button
          ><span aria-live="polite"
            >{{ pageIndex + 1 }} / {{ pages.length }}</span
          ><button
            aria-label="Próxima página"
            (click)="next()"
            [disabled]="pageIndex === pages.length - 1"
          >
            →
          </button>
        </nav>
      </div>
    }
  `,
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input({ required: true }) section!: Section;
  @ViewChild('body') body?: ElementRef<HTMLElement>;
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly game = inject(GameState);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly changeDetector = inject(ChangeDetectorRef);
  private observer?: ResizeObserver;
  private timer?: ReturnType<typeof setTimeout>;
  readonly projects = PROJECTS;
  project: ProjectCard | null = null;
  selectedProject = 0;
  pageIndex = 0;
  pages: ContentPage[] = [];
  private source: ContentPage[] = [];
  get current(): ContentPage {
    return this.pages[this.pageIndex] || { title: '' };
  }
  get sectionLabel() {
    return {
      about: 'Sobre mim',
      experience: 'Experiência',
      skills: 'Habilidades',
      contact: 'Contato',
      projects: 'Projetos',
    }[this.section];
  }
  ngOnChanges() {
    this.project = null;
    this.pageIndex = 0;
    this.load(this.section === 'projects' ? [] : [...CONTENT[this.section]]);
  }
  ngAfterViewInit() {
    if (!this.browser) return;
    this.observer = new ResizeObserver(() => this.schedulePagination());
    this.observer.observe(this.host.nativeElement);
    this.schedulePagination();
  }
  ngOnDestroy() {
    this.observer?.disconnect();
    clearTimeout(this.timer);
  }
  openProject(project: ProjectCard) {
    this.project = project;
    this.load([
      {
        title: project.name,
        text: project.summary,
      },
      {
        title: 'Tecnologias',
        text: project.technologies.join(' · '),
      },
      ...project.screenshots.map((screenshot, index) => ({
        title: `Galeria ${index + 1}/${project.screenshots.length}`,
        image: screenshot.imagePath,
        alt: screenshot.imageAlt.replace(/Placeholder \d+/, 'Captura de tela'),
      })),
      {
        title: 'Explore o projeto',
        links: [
          ...project.links.map((link) => ({
            label: `${link.label} ↗`,
            url: link.url,
          })),
          ...(project.hasDocumentation
            ? [
                {
                  label: 'Documentação ↓',
                  url: '/assets/Documentacao-Completa-IPJ.pdf',
                  download: 'Documentacao-Completa-IPJ.pdf',
                },
              ]
            : []),
        ],
      },
    ]);
  }
  private load(pages: ContentPage[]) {
    this.source = pages.flatMap((page) =>
      (page.links?.length || 0) > 1
        ? page.links!.map((link, index) => ({
            ...page,
            text: index === 0 ? page.text : undefined,
            links: [link],
          }))
        : [page],
    );
    this.pages = this.source;
    this.pageIndex = 0;
    this.schedulePagination();
  }
  private schedulePagination() {
    if (this.browser) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.paginate(), 0);
    }
  }
  private paginate() {
    const body = this.body?.nativeElement;
    if (!body || body.clientHeight < 20) return;
    const measurement = document.createElement('p');
    const style = getComputedStyle(body);
    Object.assign(measurement.style, {
      position: 'fixed',
      visibility: 'hidden',
      width: `${body.clientWidth}px`,
      font: style.font,
      lineHeight: style.lineHeight,
      margin: '0',
      overflowWrap: 'anywhere',
    });
    document.body.appendChild(measurement);
    const result: ContentPage[] = [];
    for (const page of this.source) {
      if (!page.text) {
        result.push(page);
        continue;
      }
      const words = page.text.split(/\s+/);
      let chunk = '';
      const available = Math.max(
        24,
        body.clientHeight - (page.links?.length || 0) * 42 - 12,
      );
      for (const word of words) {
        measurement.textContent = chunk ? `${chunk} ${word}` : word;
        if (measurement.clientHeight > available && chunk) {
          result.push({ title: page.title, text: chunk });
          chunk = word;
        } else chunk = measurement.textContent;
      }
      result.push({ ...page, text: chunk });
    }
    measurement.remove();
    this.pages = result;
    this.pageIndex = Math.min(this.pageIndex, Math.max(0, result.length - 1));
    this.changeDetector.markForCheck();
  }
  next() {
    this.pageIndex = Math.min(this.pages.length - 1, this.pageIndex + 1);
  }
  previous() {
    this.pageIndex = Math.max(0, this.pageIndex - 1);
  }
  back(): boolean {
    if (this.game.preview()) {
      this.game.closePreview();
      return true;
    }
    if (this.project) {
      this.project = null;
      this.pages = [];
      this.pageIndex = 0;
      return true;
    }
    return false;
  }
  command(direction: string) {
    if (this.section === 'projects' && !this.project)
      this.selectedProject =
        (this.selectedProject +
          (direction === 'up' || direction === 'left' ? 3 : 1)) %
        this.projects.length;
    else if (direction === 'left' || direction === 'up') this.previous();
    else this.next();
  }
  interact() {
    if (this.section === 'projects' && !this.project)
      this.openProject(this.projects[this.selectedProject]);
    else this.next();
  }
  openPreview(src: string, alt: string) {
    this.game.openPreview({ src, alt });
  }
}
