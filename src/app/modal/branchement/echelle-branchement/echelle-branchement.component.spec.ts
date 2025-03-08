import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchelleBranchementComponent } from './echelle-branchement.component';

describe('EchelleBranchementComponent', () => {
  let component: EchelleBranchementComponent;
  let fixture: ComponentFixture<EchelleBranchementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EchelleBranchementComponent]
    });
    fixture = TestBed.createComponent(EchelleBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
