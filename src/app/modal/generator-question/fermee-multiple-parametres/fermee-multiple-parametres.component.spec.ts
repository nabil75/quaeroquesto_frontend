import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeMultipleParametresComponent } from './fermee-multiple-parametres.component';

describe('FermeeMultipleParametresComponent', () => {
  let component: FermeeMultipleParametresComponent;
  let fixture: ComponentFixture<FermeeMultipleParametresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeMultipleParametresComponent]
    });
    fixture = TestBed.createComponent(FermeeMultipleParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
