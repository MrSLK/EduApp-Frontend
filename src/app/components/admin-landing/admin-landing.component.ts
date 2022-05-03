import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../../Services/subject.service'
import { Subject } from '../../models/subjects.model';
import { RoutersService } from 'src/app/Services/routers.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent implements OnInit {
  allSubjects: any;
  teachers: any;
  myForm!: FormGroup;
  userType! : any;
  user_details!: any;
  allSubject!: any;
  currentIndex: number = -1;
  currentSubject!: Subject;
  subjects? : Subject[];

  constructor(private formBuilder: FormBuilder, private subjectService : SubjectService, private currentPath:RoutersService) { }

  ngOnInit(): void {
    this.currentPath.get_Current_Path("admin-landing");
    this.myForm = new FormGroup({
      acceptTerms1: new FormControl('')
    });

    this.getAllSubjects();
  }

  getAllSubjects() : void {
    
    this.subjectService.viewAllSubject().subscribe(res => {
      this.allSubject = res;
      console.log(this.allSubject);
    })
  }

  setActiveSubject(subject : Subject, index : number){
    this.currentSubject = subject;
    this.currentIndex = index;

    this.subjectService.setOneSubject(this.currentSubject);


    console.log(this.currentSubject);
  }

}


