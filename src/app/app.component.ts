import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdDialog } from '@angular/material';

import { AuthenticationService, LoginService, User, UserService } from './core';
import { OpenStreamingDialog } from './dialogs/open-streaming/open-streaming.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Sema Kata Player!';
    isLoginPage = false;
    userRole: string;

    constructor(private router: Router, 
                private dialog: MdDialog, 
                private authSrv: AuthenticationService,
                private loginSrv: LoginService,
                public userSrv: UserService) {}

    ngOnInit() {
        this.authSrv.jwtTokenSubscription().subscribe(
            (newToken) => {
                this.userSrv.getUserContext()
                    .then((user: User) => {
                        this.userRole = user.role;
                    })
                    .catch((err) => {});
            }
        );

        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(
                (navigationEnd) => this.isLoginPage = !(this.router.url === '/' || this.router.url === '/login')
            );
    }

    goHome() {
        this.router.navigate(['/home']);
    }

    openAdmin() {
        this.router.navigate(['/administration']);
    }

    openCurrentChallenges() {
        this.router.navigate(['/challenge-list']);
    }

    openStreamingMode() {
        let dialogRef = this.dialog.open(OpenStreamingDialog);
        dialogRef.afterClosed().subscribe(challengeId => {
            if(challengeId) {
                this.router.navigate(['/streaming', challengeId]);
            }
        });
    }

    openRanking() {
        this.router.navigate(['/ranking']);
    }

    openAbout() {
        this.router.navigate(['/about']);
    }

    logout() {
        this.loginSrv.logout().subscribe(
            (response) => this.router.navigate(['/']),
            (error) => this.router.navigate(['/'])
        );
    }

}
