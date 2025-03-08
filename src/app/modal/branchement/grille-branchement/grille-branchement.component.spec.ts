import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleBranchementComponent } from './grille-branchement.component';

describe('GrilleBranchementComponent', () => {
  let component: GrilleBranchementComponent;
  let fixture: ComponentFixture<GrilleBranchementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GrilleBranchementComponent]
    });
    fixture = TestBed.createComponent(GrilleBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
