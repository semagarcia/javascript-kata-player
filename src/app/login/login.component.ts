import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService }  from './../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor(private router: Router, private loginSrv: LoginService) { }

    ngOnInit() {
        this.username = '';
        this.password = '';
    }

    standardLogin() {
        //this.loginSrv.standardLogin(this.username, this.email).subscribe(
        //    (response) => {
                this.router.navigate(['home']);
        //    },
        //    (err) => { console.log('Error: ', err); }
        //);
    }

}
