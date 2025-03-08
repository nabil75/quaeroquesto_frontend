import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeeMultipleBranchementComponent } from './fermee-multiple-branchement.component';

describe('FermeeMultipleBranchementComponent', () => {
  let component: FermeeMultipleBranchementComponent;
  let fixture: ComponentFixture<FermeeMultipleBranchementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FermeeMultipleBranchementComponent]
    });
    fixture = TestBed.createComponent(FermeeMultipleBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
