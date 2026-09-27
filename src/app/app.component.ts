import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Direction, GameState, Section } from './game/game-state.service';
import { StudioComponent } from './game/studio.component';
import { ContentComponent } from './game/content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudioComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  readonly game = inject(GameState);
  readonly title = 'portfolio';
  readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  @ViewChild(ContentComponent) content?: ContentComponent;
  @ViewChild('display') display?: ElementRef<HTMLElement>;
  @ViewChild('previewDialog') previewDialog?: ElementRef<HTMLDialogElement>;
  @ViewChild('previewClose') previewClose?: ElementRef<HTMLButtonElement>;
  private focusTimer?: ReturnType<typeof setTimeout>;
  private repeatTimer?: ReturnType<typeof setInterval>;
  constructor() {
    effect(() => {
      this.game.screen();
      const preview = this.game.preview();
      if (this.browser) {
        clearTimeout(this.focusTimer);
        this.focusTimer = setTimeout(
          () =>
            (preview
              ? this.previewClose?.nativeElement
              : this.display?.nativeElement
            )?.focus({ preventScroll: true }),
          0,
        );
      }
    });
  }
  get section() {
    return this.game.screen() as Section;
  }
  get label() {
    return (
      this.game.stations.find(
        (station) => station.section === this.game.screen(),
      )?.label || 'Meu estúdio'
    );
  }
  direction(direction: Direction) {
    if (this.game.preview()) return;
    if (this.game.screen() === 'menu')
      this.game.select(direction === 'up' || direction === 'left' ? -1 : 1);
    else if (this.game.screen() === 'studio') this.game.move(direction);
    else this.content?.command(direction);
  }
  hold(event: PointerEvent, direction: Direction) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.release();
    this.direction(direction);
    this.repeatTimer = setInterval(() => this.direction(direction), 180);
  }
  release() {
    clearInterval(this.repeatTimer);
  }
  interact() {
    if (this.game.preview()) return;
    if (['boot', 'studio', 'menu'].includes(this.game.screen()))
      this.game.interact();
    else this.content?.interact();
  }
  back() {
    if (this.game.preview()) {
      this.game.closePreview();
      return;
    }
    if (!this.content?.back()) this.game.back();
  }
  closePreview() {
    this.game.closePreview();
  }
  @HostListener('window:blur') blur() {
    this.release();
  }
  @HostListener('document:click', ['$event']) previewBackdrop(
    event: MouseEvent,
  ) {
    if (event.target === this.previewDialog?.nativeElement) this.closePreview();
  }
  @HostListener('document:keydown', ['$event']) keydown(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('input,textarea,select')) return;
    const directions: Record<string, Direction> = {
      ArrowUp: 'up',
      w: 'up',
      ArrowDown: 'down',
      s: 'down',
      ArrowLeft: 'left',
      a: 'left',
      ArrowRight: 'right',
      d: 'right',
    };
    if (directions[event.key]) {
      event.preventDefault();
      this.direction(directions[event.key]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.back();
    } else if (event.key.toLowerCase() === 'm') {
      if (this.game.preview()) return;
      event.preventDefault();
      this.game.menu();
    } else if (event.key === 'Enter' && !target?.closest('button,a')) {
      event.preventDefault();
      this.interact();
    }
  }
  ngOnDestroy() {
    clearTimeout(this.focusTimer);
    this.release();
  }
}
