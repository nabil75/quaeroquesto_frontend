import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestionnaryComponent } from './edit-questionnary.component';

describe('EditQuestionnaryComponent', () => {
  let component: EditQuestionnaryComponent;
  let fixture: ComponentFixture<EditQuestionnaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditQuestionnaryComponent]
    });
    fixture = TestBed.createComponent(EditQuestionnaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
