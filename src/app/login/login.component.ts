import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Ng2DeviceService } from 'ng2-device-detector';

import { AuthenticationService, EventService, LoginService, UserService } from './../core';
import { UserDialogComponent } from '../administration/users/user-dialog/user-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public username: string;
    public password: string;
    public events: Array<string>;
    public eventSelected: string;
    public loginError: string;
    public heightPer = '60%';
    //languages: Array<string>;

    constructor(
        private httpSrv: Http,
        private route: ActivatedRoute,
        private authSrv: AuthenticationService,
        private eventSrv: EventService,
        private loginSrv: LoginService,
        private routerSrv: Router,
        private userSrv: UserService,
        private device: Ng2DeviceService,
        private dialog: MdDialog
    ) {}

    ngOnInit() {
        let browser: string = this.device.getDeviceInfo().browser;
        this.username = '';
        this.password = '';
        this.eventSelected = '';
        //this.loginSrv.logout().toPromise();
        
        this.eventSrv.getCurrentEvents().subscribe(
            (events) => this.events = events,
            (err) => this.events = []
        );

        this.route.paramMap
            .map((params: ParamMap) => params.get('token'))
            .filter(token => token && token.length > 0)
            .subscribe((token) => {
                // The new token is received (from social network auth)
                this.authSrv.setJwtToken(token);
                this.routerSrv.navigate(['/home']);
            });

        switch (browser) {
            case 'chrome':
                this.heightPer = '60%';
                break;
            case 'firefox':
                this.heightPer = '75%';
                break;
        }
    }

    onEnter(event: any) {
        if (event.keyCode === 13)
            this.standardLogin();
    }

    standardLogin() {
        this.loginError = '';
        this.loginSrv.login(this.username, this.password, this.eventSelected).subscribe(
            (loggedUser) => {
                if (loggedUser)
                    this.routerSrv.navigate(['/home']);
                else
                    this.loginError = 'Error: login error';
            },
            (err) => this.loginError = 'Login error: invalid credentials'
        );
    }

    signUp() {
        this.dialog.open(UserDialogComponent, {
            data: {
                chooseRole: false
            }
        }).afterClosed().subscribe((x) => {});
    }

    recoverPwd() {

    }

}
