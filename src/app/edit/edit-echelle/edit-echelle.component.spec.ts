import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEchelleComponent } from './edit-echelle.component';

describe('EditEchelleComponent', () => {
  let component: EditEchelleComponent;
  let fixture: ComponentFixture<EditEchelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditEchelleComponent]
    });
    fixture = TestBed.createComponent(EditEchelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
