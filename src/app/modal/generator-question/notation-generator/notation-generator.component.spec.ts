import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotationGeneratorComponent } from './notation-generator.component';

describe('NotationGeneratorComponent', () => {
  let component: NotationGeneratorComponent;
  let fixture: ComponentFixture<NotationGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotationGeneratorComponent]
    });
    fixture = TestBed.createComponent(NotationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
