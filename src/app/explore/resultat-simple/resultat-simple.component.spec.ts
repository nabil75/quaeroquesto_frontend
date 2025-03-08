import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatSimpleComponent } from './resultat-simple.component';

describe('ResultatSimpleComponent', () => {
  let component: ResultatSimpleComponent;
  let fixture: ComponentFixture<ResultatSimpleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResultatSimpleComponent]
    });
    fixture = TestBed.createComponent(ResultatSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
