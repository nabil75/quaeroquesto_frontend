import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelleComponent } from './echelle.component';

describe('EchelleComponent', () => {
  let component: EchelleComponent;
  let fixture: ComponentFixture<EchelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EchelleComponent]
    });
    fixture = TestBed.createComponent(EchelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
