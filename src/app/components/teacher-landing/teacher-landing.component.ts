import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../Services/subject.service';
import Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { RoutersService } from 'src/app/Services/routers.service';

@Component({
  selector: 'app-teacher-landing',
  templateUrl: './teacher-landing.component.html',
  styleUrls: ['./teacher-landing.component.scss']
})
export class TeacherLandingComponent implements OnInit {

  constructor(
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private currentPath:RoutersService) { }

  user_details!: any;
  user_id!: any;
  id!: any;
  mySubjects!: any;
  name!: any;
  form!: FormGroup;
  usertype! : any;
  currentSubject!: any;
  currentIndex!: any;

  ngOnInit(): void {
    this.currentPath.get_Current_Path("teacher-landing");
    this.user_details = sessionStorage.getItem('user_details');
    this.user_details = JSON.parse(this.user_details);
    this.user_id = this.user_details.id;
    this.name = this.user_details.full_names;
    this.usertype = this.user_details.usertype;
  

    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });


    this.viewMySubjects();
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm() : void {
    this.id = this.form.value.checkArray[0];

    this.removeMySubject(this.id);
  }

  viewMySubjects() : void {
    this.subjectService.viewMySubjects(this.user_id).subscribe(res => {
      this.mySubjects = res;
      console.log(this.mySubjects)
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not get subjects'
      })
    })
  }

  removeMySubject(id: number) : void {
    
    this.subjectService.removeMySubject(id).subscribe(res => {
      console.log(res)

      Swal.fire({
        icon: 'success',
        title: 'Delete successful',
        text: `${res}`

  }).then((SweetAlertResult) => {
    if(SweetAlertResult.value == true) {
      window.location.href = `/${this.usertype}-landing`;
    }
  })
    }, err => {
      alert("didn't delete  subject")
    })
   
  }

   setActiveTopic(topic : any, index : number){
    this.currentSubject = topic;
    this.currentIndex = index;

    this.subjectService.setOneSubject(this.currentSubject);

    console.log(this.currentSubject);
  }

}
