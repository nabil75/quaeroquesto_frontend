import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestionnaryComponent } from './new-questionnary.component';

describe('NewQuestionnaryComponent', () => {
  let component: NewQuestionnaryComponent;
  let fixture: ComponentFixture<NewQuestionnaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NewQuestionnaryComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(NewQuestionnaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
