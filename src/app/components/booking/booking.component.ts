import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from 'src/app/Services/booking.service';
import { SubjectService } from 'src/app/Services/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  myForm!: FormGroup;
  user_details!: any;
  teacher_details!: any;
  user_id!: any;
  usertype!: any;
  full_name!: any;
  resMessage!: any;
  status : string = 'pending';
  
  constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private subjectService : SubjectService, private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.user_details = sessionStorage.getItem('user_details')
    this.user_details = JSON.parse(this.user_details)
    console.log(this.user_details);

    // this.teacher_details = this.subjectService.getOneSubject()
    this.teacher_details = JSON.parse(sessionStorage.getItem('teacher_details'))
    console.log(this.teacher_details)

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

    let object = {
        topic: this.myForm.value.topic,
        date: this.myForm.value.date,
        duration: this.myForm.value.duration,
        teacher_id: this.teacher_details.user_id,
        learner_id: this.user_id,
        subject_id: this.teacher_details.user_id,
        status: this.status
    }

    this.bookingService.book(object).subscribe(data => {
      this.resMessage = data;

      Swal.fire({
        icon: 'success',
        title: 'Booking Success',
        text: `${this.resMessage}`
      }).then((SweetAlertResult) => {
        if(SweetAlertResult){
          this.router.navigate([`/`]);
          this.routerF();
        }
      })
    }, err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Booking Error',
        text: 'Booking failed, failed to create your booking'
      })
    })


  }

  async  routerF(){
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate([`/view-bookings`]);},0,1
      )
  
  }

}
