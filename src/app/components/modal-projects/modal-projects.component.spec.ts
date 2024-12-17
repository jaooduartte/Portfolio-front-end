import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProjectsComponent } from './modal-projects.component';

describe('ModalProjectsComponent', () => {
  let component: ModalProjectsComponent;
  let fixture: ComponentFixture<ModalProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
