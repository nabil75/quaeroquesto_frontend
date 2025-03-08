import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionGeneratorComponent } from './satisfaction-generator.component';

describe('SatisfactionGeneratorComponent', () => {
  let component: SatisfactionGeneratorComponent;
  let fixture: ComponentFixture<SatisfactionGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SatisfactionGeneratorComponent]
    });
    fixture = TestBed.createComponent(SatisfactionGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
