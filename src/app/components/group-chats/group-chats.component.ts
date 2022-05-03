import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/Services/subject.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/Services/messages.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-chats',
  templateUrl: './group-chats.component.html',
  styleUrls: ['./group-chats.component.scss']
})
export class GroupChatsComponent implements OnInit {

  myForm!: FormGroup;
  user_details!: any;
  user_id!: number;
  currentTopic!: any;
  current_topic_id!: any;
  topic!: any;
  posts!: any;
  myPostResponse!: any;
  currentPost!: any;
  currentIndex!: any;
  topics!: any;

  constructor(private formBuilder: FormBuilder, private router:Router, private messagesService : MessagesService, private subjectService : SubjectService) { }

  ngOnInit(): void {

    this.user_details = sessionStorage.getItem('user_details')
    this.user_details = JSON.parse(this.user_details)
    console.log(this.user_details);
    this.user_id = this.user_details.id;
    console.log(this.user_id);
    this.currentTopic = this.subjectService.getOneSubject();
    this.current_topic_id = this.currentTopic.id
    this.topic = this.currentTopic.topic
    console.log(this.currentTopic)

    this.topics = this.messagesService.getOne()
    console.log(this.topics)
    this.myForm = new FormGroup({
      message: new FormControl('', [Validators.required])
    });

    this.getPosts();

  }

  submit() : void {
    let myPost = {
        sender_id: this.user_id,
        topic_id: this.current_topic_id,
        post: this.myForm.value.message
    }
    this.messagesService.postToSpecificDiscussion(myPost).subscribe(res => {
      this.myPostResponse = res;
      console.log(this.myPostResponse)
      if(this.myPostResponse.rowCount > 0) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Comment added successfully'
        }).then((SweetAlertResult) => {
          if(SweetAlertResult.value == true) {
            this.router.navigate([`/`]);
            this.routerF();
          }
        }); 
      }
    }, err => {
      console.log(err)
    })
  }

  getPosts() : void {

    console.log(this.current_topic_id)
    this.messagesService.getPostsFromSpecificDiscussion(this.current_topic_id).subscribe(data => {
      this.posts = data
      this.messagesService.setOne(this.posts)
      console.log(this.posts)
    }, err => {
      console.log(err)
    })
  }

  async  routerF(){
    console.log("Router");
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/group-discussion`]);},0,1
      )
  
  }

}
