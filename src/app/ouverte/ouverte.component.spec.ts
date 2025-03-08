import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuverteComponent } from './ouverte.component';

describe('OuverteComponent', () => {
  let component: OuverteComponent;
  let fixture: ComponentFixture<OuverteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuverteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuverteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
