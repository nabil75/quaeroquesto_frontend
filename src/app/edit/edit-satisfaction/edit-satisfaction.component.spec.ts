import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSatisfactionComponent } from './edit-satisfaction.component';

describe('EditSatisfactionComponent', () => {
  let component: EditSatisfactionComponent;
  let fixture: ComponentFixture<EditSatisfactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditSatisfactionComponent]
    });
    fixture = TestBed.createComponent(EditSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
