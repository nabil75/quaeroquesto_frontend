import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeSimpleModalComponent } from './fermee-simple-modal.component';

describe('FermeeSimpleModalComponent', () => {
  let component: FermeeSimpleModalComponent;
  let fixture: ComponentFixture<FermeeSimpleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeSimpleModalComponent]
    });
    fixture = TestBed.createComponent(FermeeSimpleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
