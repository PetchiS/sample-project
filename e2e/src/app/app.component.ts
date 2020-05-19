import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-ui';
  enableMenuBar:boolean = false;
  datetimenow:Date= new Date;
  notificationCount:number =100;
  constructor() {
    
  }
  enableMenu(){
  this.enableMenuBar = !this.enableMenuBar;
  }
  refreshTime() {
    this.datetimenow = new Date;
  }
}
