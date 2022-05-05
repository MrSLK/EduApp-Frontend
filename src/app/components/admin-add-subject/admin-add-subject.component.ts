import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoutersService } from 'src/app/Services/routers.service';
import { SubjectService } from 'src/app/Services/subject.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-add-subject',
  templateUrl: './admin-add-subject.component.html',
  styleUrls: ['./admin-add-subject.component.scss']
})
export class AdminAddSubjectComponent implements OnInit {

  myForm!: FormGroup;
  responseMessage!: any;
  constructor(private subjectService: SubjectService, 
    private formBuilder: FormBuilder,
    private currentPath:RoutersService) { }

  ngOnInit(): void {
    this.currentPath.get_Current_Path("admin-add-subject");
    this.myForm = new FormGroup({
      subject_name: new FormControl('', [Validators.required]),
      subject_description: new FormControl('', [Validators.required])
    });
  }


  submit(): void {
    
    let subject = {
      name: this.myForm.value.subject_name,
      description: this.myForm.value.subject_description
    }
    if(this.myForm.value.subject_name == '' || this.myForm.value.subject_description ==''){
      Swal.fire({
        icon: 'error',
        text: 'Oops.........',
        title: 'Fields must not be empty'
      })
    }
    else{
      this.subjectService.addSubject(subject).subscribe(res => {
        this.responseMessage = res;
        Swal.fire({
          icon: 'success',
          text: `${this.responseMessage}`,
          title: 'Subject added'
        })

        window.location.href = "/view-subjects"
      }, err => {
        Swal.fire({
          icon: 'error',
          text: `${this.responseMessage}`,
          title: 'Subject not added'
        })
      })
    }
  }
}
