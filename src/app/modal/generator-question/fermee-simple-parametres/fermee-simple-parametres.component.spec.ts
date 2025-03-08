import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeSimpleParametresComponent } from './fermee-simple-parametres.component';

describe('FermeeSimpleParametresComponent', () => {
  let component: FermeeSimpleParametresComponent;
  let fixture: ComponentFixture<FermeeSimpleParametresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeSimpleParametresComponent]
    });
    fixture = TestBed.createComponent(FermeeSimpleParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
