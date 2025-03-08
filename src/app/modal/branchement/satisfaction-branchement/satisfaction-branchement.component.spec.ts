import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionBranchementComponent } from './satisfaction-branchement.component';

describe('SatisfactionBranchementComponent', () => {
  let component: SatisfactionBranchementComponent;
  let fixture: ComponentFixture<SatisfactionBranchementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SatisfactionBranchementComponent]
    });
    fixture = TestBed.createComponent(SatisfactionBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
