import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionModalComponent } from './satisfaction-modal.component';

describe('SatisfactionModalComponent', () => {
  let component: SatisfactionModalComponent;
  let fixture: ComponentFixture<SatisfactionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SatisfactionModalComponent]
    });
    fixture = TestBed.createComponent(SatisfactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
