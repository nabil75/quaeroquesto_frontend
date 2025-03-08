import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelleModalComponent } from './echelle-modal.component';

describe('EchelleModalComponent', () => {
  let component: EchelleModalComponent;
  let fixture: ComponentFixture<EchelleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EchelleModalComponent]
    });
    fixture = TestBed.createComponent(EchelleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
