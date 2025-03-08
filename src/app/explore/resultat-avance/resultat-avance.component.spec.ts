import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatAvanceComponent } from './resultat-avance.component';

describe('ResultatAvanceComponent', () => {
  let component: ResultatAvanceComponent;
  let fixture: ComponentFixture<ResultatAvanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResultatAvanceComponent]
    });
    fixture = TestBed.createComponent(ResultatAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
