import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-for-spefic-question',
  templateUrl: './question-for-spefic-question.component.html',
  styleUrls: ['./question-for-spefic-question.component.scss']
})
export class QuestionForSpeficQuestionComponent implements OnInit {
  submitted: boolean;
  registerForm: any;

  constructor() { }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
}
  ngOnInit(): void {
  }

}
