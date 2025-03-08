import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeSimpleComponent } from './fermee-simple.component';

describe('FermeeSimpleComponent', () => {
  let component: FermeeSimpleComponent;
  let fixture: ComponentFixture<FermeeSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FermeeSimpleComponent]
});
    fixture = TestBed.createComponent(FermeeSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
