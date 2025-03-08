import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuestionnaryComponent } from './my-questionnary.component';

describe('MyQuestionnaryComponent', () => {
  let component: MyQuestionnaryComponent;
  let fixture: ComponentFixture<MyQuestionnaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MyQuestionnaryComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(MyQuestionnaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
