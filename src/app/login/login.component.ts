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
    events: Array<string>;
    eventSelected: string;
    loginError: string;
    //languages: Array<string>;

    constructor(private router: Router, private loginSrv: LoginService) { }

    ngOnInit() {
        this.username = '';
        this.password = '';
        this.eventSelected = '';
        this.loginSrv.logout().subscribe();
        this.loginSrv.getCurrentEvents().subscribe(
            (events) => this.events = events,
            (err) => this.events = []
        );
    }

    standardLogin() {
        this.loginError = '';
        this.loginSrv.login(this.username, this.password, this.eventSelected).subscribe(
            (loggedUser) => {
                if(loggedUser)
                    this.router.navigate(['home']);
                else
                    this.loginError = 'Error: login error';
            },
            (err) => { 
                this.loginError = 'Login error: invalid credentials';
             }
        );
    }

}
