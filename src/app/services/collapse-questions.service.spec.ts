import { TestBed } from '@angular/core/testing';

import { CollapseQuestionsService } from './collapse-questions.service';

describe('CollapseQuestionsService', () => {
  let service: CollapseQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollapseQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
