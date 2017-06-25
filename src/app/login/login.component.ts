import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Ng2DeviceService } from 'ng2-device-detector';

import { EventService, LoginService } from './../core';
import { UserDialogComponent } from '../settings/users/user-dialog/user-dialog.component';

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
        private router: Router,
        private loginSrv: LoginService,
        private eventSrv: EventService,
        private device: Ng2DeviceService,
        private dialog: MdDialog
    ) {}

    ngOnInit() {
        let browser: string = this.device.getDeviceInfo().browser;
        this.username = '';
        this.password = '';
        this.eventSelected = '';
        this.loginSrv.logout().subscribe();
        this.eventSrv.getCurrentEvents().subscribe(
            (events) => this.events = events,
            (err) => this.events = []
        );

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
                    this.router.navigate(['/home']);
                else
                    this.loginError = 'Error: login error';
            },
            (err) => {
                this.loginError = 'Login error: invalid credentials';
            }
        );
    }

    singUp() {
        this.dialog.open(UserDialogComponent, {
            data: {
                chooseRole:false
            }
        }).afterClosed().subscribe((x) => {
            console.log('Cerrado', x);
        });
    }

}
