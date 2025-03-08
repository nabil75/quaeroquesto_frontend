import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaryGeneratorComponent } from './questionnary-generator.component';

describe('QuestionnaryGeneratorComponent', () => {
  let component: QuestionnaryGeneratorComponent;
  let fixture: ComponentFixture<QuestionnaryGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaryGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaryGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
