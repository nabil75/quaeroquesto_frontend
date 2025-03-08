import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuverteModalComponent } from './ouverte-modal.component';

describe('OuverteModalComponent', () => {
  let component: OuverteModalComponent;
  let fixture: ComponentFixture<OuverteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuverteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuverteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
