import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuverteGeneratorComponent } from './ouverte-generator.component';

describe('OuverteGeneratorComponent', () => {
  let component: OuverteGeneratorComponent;
  let fixture: ComponentFixture<OuverteGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuverteGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuverteGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
