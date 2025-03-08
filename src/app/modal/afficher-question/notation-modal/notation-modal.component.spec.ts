import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationModalComponent } from './notation-modal.component';

describe('NotationModalComponent', () => {
  let component: NotationModalComponent;
  let fixture: ComponentFixture<NotationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotationModalComponent]
    });
    fixture = TestBed.createComponent(NotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
