import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeSimpleBranchementComponent } from './fermee-simple-branchement.component';

describe('FermeeSimpleBranchementComponent', () => {
  let component: FermeeSimpleBranchementComponent;
  let fixture: ComponentFixture<FermeeSimpleBranchementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeSimpleBranchementComponent]
    });
    fixture = TestBed.createComponent(FermeeSimpleBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
