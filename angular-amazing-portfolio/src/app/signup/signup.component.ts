import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupInfo:Array<any>=new Array();
  constructor(public router:Router) { }

  ngOnInit(): void {
  }


  register(signupRef:any){
    //store the data in session/local storage
    //console.log(signupRef);
    this.signupInfo.push(signupRef);
    localStorage.setItem("signupInfo", JSON.stringify(this.signupInfo));
    //console.log(this.signupInfo);
    //if condition would look good to see the field are not empty
    //before saving data into storage
    this.router.navigate(["login"]); //takes to the login page
  }

}
