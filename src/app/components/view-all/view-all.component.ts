import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Users } from 'src/app/Interfaces/users';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  

  constructor(private authService: AuthService) { }
  
  user_details!: any;
  all_users!: any;
  all_learners!: any;
  all_teachers!: any;
  getUsers = '';
  currentIndex: number = -1;;
  currentUser!: Users;
  loc = null;
  myName!: string;

  ngOnInit(): void {
    // Gets user name
    this.user_details = sessionStorage.getItem('user_details');
    this.user_details = JSON.parse(this.user_details);
    this.myName = this.user_details.full_names;
    this.getUsers = JSON.parse(sessionStorage.getItem('selector'))
    console.log(this.getUsers)
    this.getAll();
    this.allTeachers();
    this.allLearners();

  }

  //Get All users 
  getAll(): void {

    this.authService.getAll().subscribe(res => {
      this.all_users = res;
      console.log(this.all_users);
    }, err => {
      console.log(err);
    })
  }

  allTeachers() : void {
    
    this.authService.getAllTeachers().subscribe(res => {
      this.all_teachers = res;
      console.log(this.all_teachers);
    }, err => {
      console.log(err);
    })
  }

  allLearners() : void {

    this.authService.getAllLearners().subscribe(res => {
      this.all_learners = res;
      console.log(this.all_learners);
    }, err => {
      console.log(err);
    })
  }

  getusers(type: string) : void {
    this.getUsers = type;
  }

  setActiveUser(users : Users, index : number) {
    console.log(users)
    this.currentUser = users;
    this.currentIndex = index;

    this.authService.setOneUser(this.currentUser);

    console.log(this.currentUser);
  }

}
