import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MdDialog } from '@angular/material';

import { LoginService } from './core';
import { OpenStreamingDialog } from './dialogs/open-streaming/open-streaming.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'JavaScript Katas Player!';
    isLoginPage = false;

    constructor(private router: Router, 
                private dialog: MdDialog, 
                private loginSrv: LoginService) {}

    ngOnInit() {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(
                (navigationEnd) => this.isLoginPage = !(this.router.url === '/' || this.router.url === '/login')
            );
    }

    logout() {
        this.loginSrv.logout().subscribe(
            (response) => this.router.navigate(['/']),
            (error) => this.router.navigate(['/'])
        );
    }

    goHome() {
        this.router.navigate(['/home']);
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

    openSettings() {
        this.router.navigate(['/settings']);
    }

    openAbout() {
        this.router.navigate(['/about']);
    }

}
