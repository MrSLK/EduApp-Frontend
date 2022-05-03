import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  myForm!: FormGroup;
  user_details!: any;
  user_id!: any;
  usertype!: any;
  full_name!: any;
  status : string = 'pending';
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user_details = sessionStorage.getItem('user_details')
    this.user_details = JSON.parse(this.user_details)
    console.log(this.user_details);

    this.user_id = this.user_details.id
    this.usertype = this.user_details.usertype
    this.full_name = this.user_details.full_names

    this.myForm = new FormGroup({
      date: new FormControl(),
      time: new FormControl(),
      duration: new FormControl(),
      topic: new FormControl()
  });

  }

  submit() : void{
    console.log(this.myForm.value)
  }

}
