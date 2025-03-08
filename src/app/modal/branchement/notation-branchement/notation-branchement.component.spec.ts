import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationBranchementComponent } from './notation-branchement.component';

describe('NotationBranchementComponent', () => {
  let component: NotationBranchementComponent;
  let fixture: ComponentFixture<NotationBranchementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotationBranchementComponent]
    });
    fixture = TestBed.createComponent(NotationBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
