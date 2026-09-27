import { Component, inject } from '@angular/core';
import { GameState } from './game-state.service';

@Component({
  selector: 'app-studio',
  standalone: true,
  template: `
    <div class="studio-heading">
      <span>JOÃO'S STUDIO</span><span>01 / EXPLORAR</span>
    </div>
    <div
      class="room"
      aria-label="Estúdio de tecnologia. Use as setas para explorar."
    >
      <div class="window"><i></i><i></i></div>
      <div class="rug">J D</div>
      @for (station of game.stations; track station.section) {
        <button
          class="station"
          [class.nearby]="game.nearby?.section === station.section"
          [style.left.%]="(station.x / 12) * 100"
          [style.top.%]="(station.y / 8) * 100"
          (click)="game.open(station.section)"
          [attr.aria-label]="station.label"
        >
          <span class="object" [class]="'object ' + station.section"
            ><svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              shape-rendering="crispEdges"
            >
              @switch (station.section) {
                @case ('projects') {
                  <path d="M2 22h28v5H2zM4 27h3v5H4zM25 27h3v5h-3z" />
                  <path d="M6 2h20v16H6z" />
                  <path d="M9 5h14v10H9z" class="light" />
                  <path d="M13 18h6v4h-6zM11 8h3v2h-3zM15 11h6v2h-6z" />
                }
                @case ('about') {
                  <path d="M4 1h24v29H4z" />
                  <path d="M7 4h18v23H7z" class="light" />
                  <path d="M12 7h8v9h-8zM9 18h14v7H9z" />
                }
                @case ('experience') {
                  <path d="M3 0h26v32H3z" />
                  <path d="M6 3h20v10H6zM6 17h20v11H6z" class="light" />
                  <path
                    d="M9 4h3v9H9zM15 3h4v10h-4zM22 5h2v8h-2zM8 18h4v10H8zM16 20h8v3h-8zM16 25h8v3h-8z"
                  />
                }
                @case ('skills') {
                  <path
                    d="M1 19h30v6H1zM3 25h4v7H3zM25 25h4v7h-4zM5 6h3v12H5zM3 3h7v5H3zM19 4h8v4h-8zM22 8h3v10h-3z"
                  />
                  <path d="M11 10h7v7h-7z" />
                }
                @case ('contact') {
                  <path d="M3 1h26v22H3zM13 23h6v4h-6zM7 28h18v3H7z" />
                  <path d="M6 4h20v16H6z" class="light" />
                  <path
                    d="M9 7h14v2H9zM9 9h2v7H9zM21 9h2v7h-2zM11 10h3v2h-3zM18 10h3v2h-3zM14 12h4v2h-4zM11 16h10v2H11z"
                  />
                }
              }</svg
          ></span>
          <span class="station-label">{{ station.label }}</span>
        </button>
      }
      <div
        class="player"
        [style.left.%]="(game.position().x / 12) * 100"
        [style.top.%]="(game.position().y / 8) * 100"
        [attr.data-direction]="game.direction()"
        aria-hidden="true"
      >
        <span class="hair"></span><span class="face"></span
        ><span class="shirt"></span><span class="feet"></span>
      </div>
    </div>
    <div class="studio-hint" aria-live="polite">
      @if (game.nearby) {
        <span>A</span> {{ game.nearby.label }} · interagir
      } @else {
        <span>↔</span> Explore o estúdio ou abra o menu
      }
    </div>
  `,
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  readonly game = inject(GameState);
}
