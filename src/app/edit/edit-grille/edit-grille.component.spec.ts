import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGrilleComponent } from './edit-grille.component';

describe('EditGrilleComponent', () => {
  let component: EditGrilleComponent;
  let fixture: ComponentFixture<EditGrilleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditGrilleComponent]
    });
    fixture = TestBed.createComponent(EditGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
