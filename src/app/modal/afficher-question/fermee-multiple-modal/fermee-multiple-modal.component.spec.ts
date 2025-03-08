import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeMultipleModalComponent } from './fermee-multiple-modal.component';

describe('FermeeMultipleModalComponent', () => {
  let component: FermeeMultipleModalComponent;
  let fixture: ComponentFixture<FermeeMultipleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeMultipleModalComponent]
    });
    fixture = TestBed.createComponent(FermeeMultipleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
