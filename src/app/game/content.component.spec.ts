import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ContentComponent } from './content.component';
import { GameState } from './game-state.service';
import { PROJECTS } from './projects.data';

describe('ContentComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [ContentComponent] }),
  );
  it('preserves screenshots, links and documentation for every project', () => {
    const fixture = TestBed.createComponent(ContentComponent);
    const content = fixture.componentInstance;
    fixture.componentRef.setInput('section', 'projects');
    fixture.detectChanges();
    for (const project of PROJECTS) {
      content.openProject(project);
      expect(content.pages.some((page) => page.text === project.summary)).toBeTrue();
      expect(
        content.pages.some(
          (page) =>
            page.title === 'Tecnologias' &&
            page.text === project.technologies.join(' · '),
        ),
      ).toBeTrue();
      expect(content.pages.filter((page) => page.image).length).toBe(
        project.screenshots.length,
      );
      expect(content.pages.flatMap((page) => page.links || []).length).toBe(
        project.links.length + Number(project.hasDocumentation),
      );
      content.previous();
      expect(content.pageIndex).toBe(0);
      for (let index = 0; index < 30; index++) content.next();
      expect(content.pageIndex).toBe(content.pages.length - 1);
      expect(content.back()).toBeTrue();
      expect(content.project).toBeNull();
    }
    fixture.destroy();
  });
  it('opens an image in the shared hologram preview and closes it before returning', () => {
    const fixture = TestBed.createComponent(ContentComponent);
    const content = fixture.componentInstance;
    const game = TestBed.inject(GameState);
    fixture.componentRef.setInput('section', 'projects');
    fixture.detectChanges();
    content.openProject(PROJECTS[0]);
    const screenshot = PROJECTS[0].screenshots[0];
    content.openPreview(screenshot.imagePath, screenshot.imageAlt);
    expect(game.preview()).toEqual({
      src: screenshot.imagePath,
      alt: screenshot.imageAlt,
    });
    content.back();
    expect(game.preview()).toBeNull();
    expect(content.project).toBe(PROJECTS[0]);
    fixture.destroy();
  });
  it('renders each skill with an accessible percentage progress bar', () => {
    const fixture = TestBed.createComponent(ContentComponent);
    fixture.componentRef.setInput('section', 'skills');
    fixture.detectChanges();
    const content = fixture.componentInstance;
    expect(content.pages[0].progress).toBeDefined();
    expect(
      fixture.nativeElement.querySelector('[role="progressbar"]')?.getAttribute(
        'aria-valuenow',
      ),
    ).toBe(String(content.pages[0].progress));
    fixture.destroy();
  });
  it('paginates narrow screens without losing text', fakeAsync(() => {
    const fixture = TestBed.createComponent(ContentComponent);
    fixture.componentRef.setInput('section', 'about');
    fixture.detectChanges();
    const content = fixture.componentInstance;
    const original = content.pages.map((page) => page.text).join(' ');
    const body = fixture.nativeElement.querySelector('.page-body');
    spyOnProperty(body, 'clientHeight').and.returnValue(48);
    spyOnProperty(body, 'clientWidth').and.returnValue(150);
    tick();
    fixture.detectChanges();
    expect(content.pages.length).toBeGreaterThan(5);
    expect(content.pages.map((page) => page.text).join(' ')).toBe(original);
    expect(
      fixture.nativeElement.querySelector('.page-body').textContent.trim(),
    ).toBe(content.pages[0].text);
    fixture.destroy();
  }));
  it('provides contact links and the existing curriculum', () => {
    const fixture = TestBed.createComponent(ContentComponent);
    fixture.componentRef.setInput('section', 'contact');
    fixture.detectChanges();
    const links = fixture.componentInstance.pages.flatMap(
      (page) => page.links || [],
    );
    expect(links.some((link) => link.url.startsWith('mailto:'))).toBeTrue();
    expect(
      links.some((link) => link.download === 'CURRICULO-2026.2.pdf'),
    ).toBeTrue();
    fixture.destroy();
  });
});
