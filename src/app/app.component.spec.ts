/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });
  it('renders the console and allows skipping directly to the menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
      'Pequena tela.',
    );
    fixture.nativeElement.querySelector('.boot-menu').click();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('.game-menu button').length,
    ).toBe(5);
    fixture.destroy();
  });
  it('supports movement, menu shortcut and return', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.game.start();
    app.keydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(app.game.position().x).toBe(5);
    app.keydown(new KeyboardEvent('keydown', { key: 'm' }));
    expect(app.game.screen()).toBe('menu');
    app.keydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(app.game.screen()).toBe('studio');
    fixture.destroy();
  });
  it('renders and closes the hologram preview before navigating back', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.game.openPreview({ src: 'assets/softwareipj.jpeg', alt: 'Exemplo' });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.hologram-dialog')).not.toBeNull();
    app.keydown(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(app.game.preview()).toBeNull();
    expect(fixture.nativeElement.querySelector('.hologram-dialog')).toBeNull();
    fixture.destroy();
  });
});
