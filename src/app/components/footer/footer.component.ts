import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2"


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  popUp() : void {
     
    Swal.fire({
      title: `T's & C's`,
      text: `The Terms & Conditions document :The user is agreeing of a terms and conditions document typically spans multiple laws (everything from consumer law to copyright law). They should allow you to set your rules for user behavior, including appropriate disclaimers for any misuse of your product or service. This is trickier than it seems as even businesses with the same model may have different processes, needs, and user behavior. Let’s look at some examples to better illustrate this.`,
      footer: '<a href="">Why do I have this issue?</a>'
    })
  }
}
