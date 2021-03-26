import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  retrievedInfo:Array<any>=new Array();
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  verifyUser(loginRef:any){
    //console.log(loginRef);
    //console.log(loginRef.pass);
    //var retrievedInfo = JSON.parse(localStorage.getItem('signupInfo'));
    //JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.retrievedInfo = JSON.parse(localStorage.getItem("signupInfo") || '{}');
    //console.log(this.retrievedInfo[0].user);
    if (this.retrievedInfo[0].user == loginRef.user &&
      this.retrievedInfo[0].pass == loginRef.pass){
        //verification Successful. route to portfolio
        //this.router.navigate(["login"]);
        this.router.navigate(["portfolio"]);
      }else{
        this.router.navigate(["login"]);
      }
  }

}
