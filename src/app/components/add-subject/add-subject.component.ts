import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../Services/subject.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { RoutersService } from 'src/app/Services/routers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  form!: FormGroup;
  Myform!: FormGroup;
  allSubjects!: any;
  user_details!: any;
  user_id!: number;
  subject_id!: number;
  usertype!: any;
  resMessage!: any;
  mySubjects!: any;
  currentSubject!: any;
  currentIndex!: any;
  
  
  constructor(private subjcectService : SubjectService, 
              private formBuilder : FormBuilder,  
              private fb: FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private currentPath:RoutersService,
              private subjectService : SubjectService,
              ) { }

  ngOnInit(): void {
    this.currentPath.get_Current_Path("add-subject");
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
    this.getAll();
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
  submitForm() {
    console.log(this.form.value.checkArray[0]);
  }

  getAll() : void {

    this.user_details = sessionStorage.getItem('user_details')
    this.user_details = JSON.parse(this.user_details);
    this.user_id = this.user_details.id;
    this.usertype = this.user_details.usertype;

    this.subjcectService.viewAllSubject().subscribe(res => {
      this.allSubjects = res;
    }, err => {
      console.log(err + "couldn't get subject")
    })
  }

  assignSubject(subject_id : number) : void {

    console.log(subject_id)
    let assignSubject = {
      user_id: this.user_id,
      subject_id: subject_id
    }
    this.subjcectService.assignSubject(assignSubject).subscribe(res => {
      this.resMessage = res;
      console.log(this.resMessage)

      if(this.resMessage == 'Subject already added') {
        Swal.fire({
          icon: 'error',
          title: 'Oooops.....',
          text: `${this.resMessage}`
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `${this.resMessage}`,
          
        }).then((SweetAlertResult) => {
          if(SweetAlertResult.value == true) {
            // window.location.href = `/${this.usertype}-landing`;
            console.log(`/${this.usertype}-landing`);
            
            this.router.navigate([`/`]);
            this.routerF();
          }
        });    
      }  
    },err => {
      console.log("Didn't assign subject");
    })
  }

 async  routerF(){
    console.log("Router");
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/${this.usertype}-landing`]);},0,1
      )
  
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
  setActiveTopic(topic : any, index : number){
    this.currentSubject = topic;
    this.currentIndex = index;

    this.subjectService.setOneSubject(this.currentSubject);

    console.log(this.currentSubject);
  }

  removeMySubject(id : number) : void {
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
}