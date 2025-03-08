import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuverteBranchementComponent } from './ouverte-branchement.component';

describe('OuverteBranchementComponent', () => {
  let component: OuverteBranchementComponent;
  let fixture: ComponentFixture<OuverteBranchementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuverteBranchementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuverteBranchementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
