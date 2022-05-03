import { Component, OnInit } from '@angular/core';
import { RoutersService } from 'src/app/Services/routers.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private currentPath:RoutersService) { }

  ngOnInit(): void {
    this.currentPath.get_Current_Path("home");
  }
}
