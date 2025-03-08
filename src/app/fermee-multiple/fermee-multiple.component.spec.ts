import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeMultipleComponent } from './fermee-multiple.component';

describe('FermeeMultipleComponent', () => {
  let component: FermeeMultipleComponent;
  let fixture: ComponentFixture<FermeeMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [FermeeMultipleComponent]
});
    fixture = TestBed.createComponent(FermeeMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
