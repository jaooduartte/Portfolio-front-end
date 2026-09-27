import { Injectable, signal } from '@angular/core';

export type Section =
  'projects' | 'about' | 'experience' | 'skills' | 'contact';
export type Direction = 'up' | 'down' | 'left' | 'right';
export type ImagePreview = {
  src: string;
  alt: string;
};
export const STATIONS: ReadonlyArray<{
  section: Section;
  label: string;
  symbol: string;
  x: number;
  y: number;
}> = [
  { section: 'projects', label: 'Projetos', symbol: '▣', x: 2, y: 1 },
  { section: 'about', label: 'Sobre mim', symbol: '▧', x: 6, y: 1 },
  { section: 'experience', label: 'Experiência', symbol: '▤', x: 9, y: 1 },
  { section: 'skills', label: 'Habilidades', symbol: '⚒', x: 2, y: 5 },
  { section: 'contact', label: 'Contato', symbol: '✉', x: 9, y: 5 },
];

@Injectable({ providedIn: 'root' })
export class GameState {
  readonly screen = signal<'boot' | 'studio' | 'menu' | Section>('boot');
  readonly position = signal({ x: 6, y: 5 });
  readonly direction = signal<Direction>('down');
  readonly selection = signal(0);
  readonly preview = signal<ImagePreview | null>(null);
  readonly stations = STATIONS;

  get nearby() {
    return STATIONS.find(
      (station) =>
        Math.abs(station.x - this.position().x) +
          Math.abs(station.y - this.position().y) ===
        1,
    );
  }

  move(direction: Direction) {
    if (this.screen() !== 'studio') return;
    this.direction.set(direction);
    const offset = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[
      direction
    ];
    const next = {
      x: this.position().x + offset[0],
      y: this.position().y + offset[1],
    };
    if (next.x < 0 || next.x > 11 || next.y < 0 || next.y > 7) return;
    if (
      STATIONS.some((station) => station.x === next.x && station.y === next.y)
    )
      return;
    this.position.set(next);
  }

  open(section: Section) {
    this.screen.set(section);
  }
  start() {
    this.screen.set('studio');
  }
  menu() {
    this.selection.set(0);
    this.screen.set('menu');
  }
  back() {
    this.screen.set('studio');
  }
  openPreview(preview: ImagePreview) {
    this.preview.set(preview);
  }
  closePreview() {
    this.preview.set(null);
  }
  interact() {
    if (this.screen() === 'boot') this.start();
    else if (this.screen() === 'studio' && this.nearby)
      this.open(this.nearby.section);
    else if (this.screen() === 'menu')
      this.open(STATIONS[this.selection()].section);
  }
  select(offset: number) {
    this.selection.update(
      (value) => (value + offset + STATIONS.length) % STATIONS.length,
    );
  }
}
