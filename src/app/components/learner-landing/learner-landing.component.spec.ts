import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnerLandingComponent } from './learner-landing.component';
import { SubjectService } from 'src/app/Services/subject.service';

describe('LearnerLandingComponent', () => {
  let component: LearnerLandingComponent;
  let fixture: ComponentFixture<LearnerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
