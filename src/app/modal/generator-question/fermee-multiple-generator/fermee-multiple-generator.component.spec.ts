import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeMultipleGeneratorComponent } from './fermee-multiple-generator.component';

describe('FermeeMultipleGeneratorComponent', () => {
  let component: FermeeMultipleGeneratorComponent;
  let fixture: ComponentFixture<FermeeMultipleGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeMultipleGeneratorComponent]
    });
    fixture = TestBed.createComponent(FermeeMultipleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
