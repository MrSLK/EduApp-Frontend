import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionForSpeficQuestionComponent } from './question-for-spefic-question.component';

describe('QuestionForSpeficQuestionComponent', () => {
  let component: QuestionForSpeficQuestionComponent;
  let fixture: ComponentFixture<QuestionForSpeficQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionForSpeficQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionForSpeficQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
