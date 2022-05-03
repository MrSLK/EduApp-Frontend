import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SubjectService } from 'src/app/Services/subject.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {

  myForm!: FormGroup;
  upload_res!: any;
  file!: any;
  routerLink!: any;
  usertype!: any;
  id!: any;
  saveDocs!: any;
  file_name!: any;

  constructor(private formBuilder: FormBuilder,
    private subjectService : SubjectService, private userService : UserService) { }

  ngOnInit(): void {

    this.myForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });

    if(sessionStorage.getItem("user_details")) {
     this.routerLink = sessionStorage.getItem("user_details");
     this.routerLink = JSON.parse(this.routerLink);
     this.usertype = this.routerLink.usertype;
     this.id = this.routerLink.id
     
    }
    if(localStorage.getItem("user_details")) {
      this.routerLink = localStorage.getItem("user_details");
      this.routerLink = JSON.parse(this.routerLink);
      this.usertype = this.routerLink.usertype;
      this.id = this.routerLink.id
    }
  }

  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event) {
  
      if (event.target.files.length > 0) {
        console.log(event.target.files[0]);
        this.file = event.target.files[0];
        this.file_name = event.target.files[0].name;
        console.log(this.myForm.value.description)
      }
  }

  async submit() : Promise<void> {
    
    const formData = new FormData();
    formData.append('file', this.file);
   
    
    console.log(formData)
    console.log(this.myForm.get('fileSource').value)

    await this.subjectService.uploadDocuments(formData).subscribe(res => {
      this.upload_res = res;
      console.log(this.upload_res);
      
      let teacher_details = {
        teacher_id : this.id,
        description: this.myForm.value.description,
        upload_res : this.upload_res.object.response_url,
        name : this.file_name
      }
     
    if(this.upload_res != undefined){
      console.log(teacher_details)
      this.userService.saveMyDocs(teacher_details).subscribe(res => {
        this.saveDocs = res;
        // console.log("Saved successfully")
        Swal.fire({
          icon: 'success',
          title: 'Uploading Document',
          text: `Successfully uploaded '${this.file_name}'`
        }).then((SweetAlertResult) => {
          if(SweetAlertResult.value == true) {
            window.location.href = `/${this.usertype}-landing`;
          }
        });
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Ooooops.......',
          text: 'Failed to save your document'
        })
      })
    }
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Ooooops.......',
        text: 'Failed to upload your document'
      })
    })
  }
}
