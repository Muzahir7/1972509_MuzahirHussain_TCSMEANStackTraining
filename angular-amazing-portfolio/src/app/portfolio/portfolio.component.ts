import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  retrievedInfo:any = JSON.parse(localStorage.getItem("signupInfo") || '{}');
  user:any = this.retrievedInfo[0].user;
  contacts:Array<any>=new Array();
  constructor() { }

  ngOnInit(): void {
  }

  saveContact(contactRef:any){
    //console.log(contactRef);
    this.contacts.push(contactRef);
  }

}
