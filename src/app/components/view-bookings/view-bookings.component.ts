import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../Services/subject.service';
import Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import { RoutersService } from 'src/app/Services/routers.service';
import { AuthService } from 'src/app/Services/auth.service';
import { BookingService } from 'src/app/Services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.scss']
})
export class ViewBookingsComponent implements OnInit {

  user_details!: any;
  user_id!: any;
  usertype!: any;
  bookingRes!: any;
  full_name!: any;
  bookee_name!: any;
  booking_id!: any;
  updateRes!: any;
  admin_bookings!: any;
  sessionRes!: any;
  session_id!: any;
  selector!: any;

  constructor(private bookingService : BookingService, 
    private router:Router) { }

  ngOnInit(): void {

    this.user_details = sessionStorage.getItem('user_details')
    this.user_details = JSON.parse(this.user_details)
    console.log(this.user_details);

    this.user_id = this.user_details.id
    this.usertype = this.user_details.usertype
    this.full_name = this.user_details.full_names

    this.getBooking();

    this.selector = JSON.parse(sessionStorage.getItem('selector'))

    if(this.usertype === 'teacher'){
      this.bookee_name = 'Learner'
    }else if(this.usertype === 'learner'){
      this.bookee_name = 'Teacher'
    }

    this.getAllBookings();

  }

  getBooking(): void {

    let object = {
      user_id: this.user_id,
        usertype: this.usertype
    }
    // console.log(object);
    this.bookingService.getBooking(object).subscribe(data => {
      this.bookingRes = data;
      this.booking_id = this.bookingRes.id
      // console.log(this.bookingRes)
      if(this.bookingRes.rowCount == 0){
        Swal.fire({
          icon: 'warning',
          title: 'No bookings found'
        }).then((SweetAlertResult) =>{
          if(SweetAlertResult){
          // window.location.href = `/${this.object.usertype}-landing`;
         }
        })
      }
    }, err => {
      // console.log(err);
    })
  }

  updateStatus(booking_object : any, new_status : string) : void {

    let object = {
      id: booking_object.id,
      teacher_id: this.user_id,
      status: new_status
    }

    this.bookingService.updateBooking(object).subscribe(data => {
      this.updateRes = data;
      // console.log(this.updateRes)

      let newObject = {
        booking_id: object.id
      };
      if(object.status == 'approved'){
        this.bookingService.createSession(newObject).subscribe(sessionResponse => {
          this.sessionRes = sessionResponse
          this.session_id = this.sessionRes.id
          let session = {
            update_booking: this.updateRes,
            session_id: this.session_id
          }
          sessionStorage.setItem('session_id', JSON.stringify(session))
        }, err => {
          // console.log(err)
        })
      }
        Swal.fire({
          icon: 'success',
          title: 'Status updated successfully',
          text: 'Status updated successfully'
        }).then((SweetAlertResult) => {
          if(SweetAlertResult.value == true) {
            // window.location.href = `/${this.usertype}-landing`;
            // console.log(`/${this.usertype}-landing`);
            
            this.router.navigate([`/`]);
            this.routerF();
          }
        });
      
    
    }, err => {
      // console.log(err)
    })
   }

   async  routerF(){
    // console.log("Router");
    
    this.router.navigate([`/`]);

    return await setTimeout(() => {
      this.router.navigate(['/view-bookings']);},0,1
      )
  
  }

  getAllBookings() : void{
    if(this.usertype == 'admin'){
      this.bookingService.getAllBookings().subscribe(data => {
        this.admin_bookings = data;
        console.log(this.admin_bookings)
      }, err => {
        // console.log(err)
      })
    }
    else{
      // console.log("Not admin")
    }
  }

  goToChats(object : {}){
    
    // console.log(object)
    sessionStorage.setItem('booking_details', JSON.stringify(object))
    // console.log(object);
    window.location.href = "/chats";
  }

}