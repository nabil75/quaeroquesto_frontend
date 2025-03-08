import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeSimpleGeneratorComponent } from './fermee-simple-generator.component';

describe('FermeeSimpleGeneratorComponent', () => {
  let component: FermeeSimpleGeneratorComponent;
  let fixture: ComponentFixture<FermeeSimpleGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeSimpleGeneratorComponent]
    });
    fixture = TestBed.createComponent(FermeeSimpleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
