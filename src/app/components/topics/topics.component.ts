import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/Services/messages.service';
import { SubjectService } from 'src/app/Services/subject.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  
  
  id!: any;
  topics!: any;
  subject_name!: any;
  description!: any;
  currentIndex!: number;
  currentTopic!: any;
  currentSubject!: any;
  teachers!: any;
  myForm!: FormGroup;
  myId!: any;
  user_details!: any;
  messageRes!: any;
  usertype!: any;
  assignedId!: any;
  latest_topic!: any;
  resultLearner: any = '';
  resultTeacher: any = '';
  currentTeacher!: any;
  currentTeachderIndex!: any;
  

  constructor(private route:ActivatedRoute,
              private router:Router,
              private messagesService : MessagesService, 
              private subjectService : SubjectService) { }

  ngOnInit(): void {

    this.user_details = JSON.parse(sessionStorage.getItem('user_details'))
    this.myId = this.user_details.id;
    this.usertype = this.user_details.usertype

    this.myForm = new FormGroup({
      topic: new FormControl(),
  });

    this.currentSubject = this.subjectService.getOneSubject();

    console.log(this.currentSubject)
    this.id = this.currentSubject.subject_id;
    this.assignedId = this.currentSubject.id;
    console.log()
    console.log(this.id)
    this.description = this.currentSubject.description;

    

    this.submit();
    this.getTeachers();

    this.getUser('learner');
    this.getUser('teacher');

   
  }

  getTeachers() : void {
    console.log("get teachers")
    console.log(this.id)
    this.subjectService.getAllTeachers(this.id).subscribe(data => {
      this.teachers = data;
      console.log(this.teachers)
    }, err => {
      console.log(err)
    })
  }

  submit() : void {
    this.messagesService.getTopicsForSpecificSubject(this.id).subscribe(data => {
      this.topics = data;
      this.messagesService.setOne(this.topics)
      this.subject_name = this.topics[0].name;
      this.latest_topic = this.topics[this.topics.length - 1]
      console.log(this.topics)
    },err => {
      console.log(err)
    })
  }

  setActiveTopic(topic : any, index : number){
    this.currentTopic = topic;
    this.currentIndex = index;

    this.subjectService.setOneSubject(this.currentTopic);

    console.log(this.currentTopic);
  }

  setActiveTeacher(teacher : any, index : number){
    this.currentTeacher = teacher;
    this.currentTeachderIndex = index;

    this.subjectService.setOneSubject(this.currentTeacher);

    console.log(this.currentTeacher);

    sessionStorage.setItem('teacher_details', JSON.stringify(this.currentTeacher));

    window.location.href = '/booking'
  }

  submitTopic() : void {
    let topic = {
      sender_id: this.myId,
      topic: this.myForm.value.topic,
      subject_id: this.id
  }

  this.messagesService.groupChat(topic).subscribe(res => {
    this.messageRes = res;
    if(this.messageRes.length > 0){
      Swal.fire({
        icon: 'success',
        title: 'Topic uploaded successfully',
        text: 'Your topic was successfully started'
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

  async  routerF(){
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/topics`]);},0,1
      )
  
  }

  removeMySubject() : void {
    console.log(this.id)
    this.subjectService.removeMySubject(this.assignedId).subscribe(res => {
      console.log(res)
      console.log("shiba")
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

  getUser(userType: string) : void {
    let usertypes = {
      usertype: userType,
      subject_id: this.id
    }

    this.subjectService.getUsers(usertypes).subscribe(data => {
      if(userType == 'learner'){
        this.resultLearner = data
      } else if(userType == 'teacher'){
        this.resultTeacher = data
      }
    }, err => {
      console.log(err)
    })
    
  }


}
