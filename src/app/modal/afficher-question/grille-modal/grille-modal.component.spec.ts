import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleModalComponent } from './grille-modal.component';

describe('GrilleModalComponent', () => {
  let component: GrilleModalComponent;
  let fixture: ComponentFixture<GrilleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrilleModalComponent]
    });
    fixture = TestBed.createComponent(GrilleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
