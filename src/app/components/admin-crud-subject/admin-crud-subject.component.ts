import { Component, Input, OnInit } from '@angular/core';
import { Subject } from '../../models/subjects.model';
import { SubjectService } from 'src/app/Services/subject.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoutersService } from 'src/app/Services/routers.service';

@Component({
  selector: 'app-admin-crud-subject',
  templateUrl: './admin-crud-subject.component.html',
  styleUrls: ['./admin-crud-subject.component.scss']
})
export class AdminCrudSubjectComponent implements OnInit {

  @Input() viewMode = false;
  currentSubject!: any;
  name!: any;
  description!: any;
  id!: any;
  myForm!: FormGroup;

  constructor(private subjectService: SubjectService,
    private route: ActivatedRoute,
    private currentPath:RoutersService) { }

  ngOnInit(): void {
    this.currentPath.get_Current_Path("subject-details");
    this.myForm = new FormGroup({
      subject_name: new FormControl(),
      subject_description: new FormControl()
  });

    this.currentSubject = this.subjectService.getOneSubject()
    console.log(this.currentSubject);

    this.name = this.currentSubject.name;
    this.description = this.currentSubject.description;
    this.id = this.currentSubject.id;

  }

  deleteSubject(id: string) : void {
    let subId = id;
    
    this.subjectService.deleteSubject(subId).subscribe(res => {
      console.log(res)
      Swal.fire({
        icon: 'success',
        text: `successfully deleted ${this.name}`,
        title: 'delete'
      })
      window.location.href = "/view-subjects";
    }, err => {
      Swal.fire({
        icon: 'error',
        text: `Couldn't delete ${this.name}`,
        title: 'Oooops'
      })
    })
  }
  updateSubject(id: number) : void {
    let subId = id;
    let object = {
      name: null,
      description: null
    }

    if(this.myForm.value.subject_name === null && this.myForm.value.subject_description !== null)
    {
      object = {
        name: this.name,
        description: this.myForm.value.subject_description
      }
    }
    else if(this.myForm.value.subject_description === null && this.myForm.value.subject_name !== null)
    {
      object = {
        name: this.myForm.value.subject_name,
        description: this.description
      }
    }
    else{
      object = {
        name: this.myForm.value.subject_name,
        description: this.myForm.value.subject_description
      }
    }

    // let object = {
    //   name: this.myForm.value.subject_name,
    //   description: this.myForm.value.subject_description
    // }

    console.log(object)
    this.subjectService.updateSubject(object, subId).subscribe(res =>{
      console.log(res)
      Swal.fire({
        icon: 'success',
        text: `successfully updated ${this.name}`,
        title: 'Update'
      })
      window.location.href = "/view-subjects";
    }, err => {
      Swal.fire({
        icon: 'error',
        text: `Couldn't update ${this.name}`,
        title: 'Oooops'
      })

  })
}
}
