import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/Services/messages.service';
import { SubjectService } from 'src/app/Services/subject.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  topic!: any;
  header!: any;
  replies!: any;
  question_id!: any;
  myForm!: FormGroup;
  user_details!: any;
  user_id!: any;
  replyRes!: any;
  usertype!: any;
  other_questions!: any;


  constructor(private subjectService : SubjectService,
             private router:Router,
             private messagesService : MessagesService) { }

  ngOnInit(): void {

    this.user_details = JSON.parse(sessionStorage.getItem('user_details'))
    this.user_id = this.user_details.id
    this.usertype = this.user_details.usertype

    this.topic = this.subjectService.getOneSubject();
    this.header = this.topic.post
    this.question_id = this.topic.id;

    this.getReplies()

    this.myForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    });

    this.other_questions = this.messagesService.getOne()
    console.log(this.other_questions)

  }

  getReplies() : void {

    console.log(this.question_id)
    this.messagesService.getReplies(this.question_id).subscribe(data => {
      this.replies = data
      console.log(this.replies)
    }, err => {
      console.log(err)
    })
  }

  submit() : void {
    let reply = {
      question_id: this.question_id,
      user_id: this.user_id,
      reply: this.myForm.value.message
  }
  this.messagesService.makeReply(reply).subscribe(data => {
    this.replyRes = data
    Swal.fire({
      icon: 'success',
      text: `${this.replyRes}`,
      title: 'Reply successful' 
    }).then((SweetAlertResult) => {
      if(SweetAlertResult){
        // window.location.href = `${this.usertype}-landing`
        this.router.navigate([`/`]);
          this.routerF();
      }
    })
  }, err => {
    console.log(err)
  })
  }

  async  routerF(){
    console.log("Router");
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/reply`]);},0,1
      )
  
  }

}
