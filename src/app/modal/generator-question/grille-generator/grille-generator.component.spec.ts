import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleGeneratorComponent } from './grille-generator.component';

describe('GrilleGeneratorComponent', () => {
  let component: GrilleGeneratorComponent;
  let fixture: ComponentFixture<GrilleGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrilleGeneratorComponent]
    });
    fixture = TestBed.createComponent(GrilleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
