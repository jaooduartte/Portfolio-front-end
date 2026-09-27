import { GameState, STATIONS } from './game-state.service';

describe('GameState', () => {
  let game: GameState;
  beforeEach(() => {
    game = new GameState();
    game.start();
  });
  it('moves one cell and respects the map boundaries', () => {
    game.position.set({ x: 0, y: 0 });
    game.move('left');
    game.move('up');
    expect(game.position()).toEqual({ x: 0, y: 0 });
    game.move('right');
    expect(game.position()).toEqual({ x: 1, y: 0 });
    game.position.set({ x: 11, y: 7 });
    game.move('right');
    game.move('down');
    expect(game.position()).toEqual({ x: 11, y: 7 });
  });
  it('blocks furniture and opens each adjacent station', () => {
    for (const station of STATIONS) {
      game.start();
      game.position.set({ x: station.x, y: station.y + 1 });
      game.move('up');
      expect(game.position().y).toBe(station.y + 1);
      expect(game.nearby?.section).toBe(station.section);
      game.interact();
      expect(game.screen()).toBe(station.section);
    }
  });
  it('pauses movement in content and restores position', () => {
    const position = game.position();
    game.open('projects');
    game.move('right');
    expect(game.position()).toEqual(position);
    game.back();
    expect(game.screen()).toBe('studio');
    expect(game.position()).toEqual(position);
  });
  it('offers every section from the menu without exploration', () => {
    STATIONS.forEach((station, index) => {
      game.menu();
      game.select(index);
      game.interact();
      expect(game.screen()).toBe(station.section);
    });
    game.menu();
    game.select(-1);
    expect(game.selection()).toBe(4);
  });
  it('does not interact with distant furniture', () => {
    game.interact();
    expect(game.screen()).toBe('studio');
  });
  it('opens and closes an image preview without changing the active screen', () => {
    game.open('projects');
    game.openPreview({ src: 'assets/example.png', alt: 'Exemplo' });
    expect(game.preview()).toEqual({ src: 'assets/example.png', alt: 'Exemplo' });
    expect(game.screen()).toBe('projects');
    game.closePreview();
    expect(game.preview()).toBeNull();
  });
});
