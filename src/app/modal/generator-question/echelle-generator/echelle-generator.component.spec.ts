import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelleGeneratorComponent } from './echelle-generator.component';

describe('EchelleGeneratorComponent', () => {
  let component: EchelleGeneratorComponent;
  let fixture: ComponentFixture<EchelleGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EchelleGeneratorComponent]
    });
    fixture = TestBed.createComponent(EchelleGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
