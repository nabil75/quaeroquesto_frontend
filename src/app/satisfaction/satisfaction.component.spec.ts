import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionComponent } from './satisfaction.component';

describe('SatifactionComponent', () => {
  let component: SatisfactionComponent;
  let fixture: ComponentFixture<SatisfactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SatisfactionComponent]
    });
    fixture = TestBed.createComponent(SatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
