import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseURL = environment.booking;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http : HttpClient) { }

  //Make a booking
  book(object : {}){
    return this.http.post(`${baseURL}book`, object)
  }

  //get booking
  getBooking(object : {}){
    console.log(object);
    
    return this.http.post(`${baseURL}get-booking`, object)
  }

  //update bookings
  updateBooking(object : {}) {
    return this.http.put(`${baseURL}update-booking`, object)
  }

  //Get all bookings
  getAllBookings(){
    return this.http.get(`${baseURL}get-all-bookings`)
  }

  //Create session create-session
  createSession(object : {}){
    return this.http.post(`${baseURL}create-session`, object)
  }


}
