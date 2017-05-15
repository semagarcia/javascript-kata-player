import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { LoginService } from './core';
import { OpenStreamingDialog } from './dialogs/open-streaming/open-streaming.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'JavaScript Katas Player!';

    constructor(private router: Router, public dialog: MdDialog, private loginSrv: LoginService) {}

    logout() {
        this.loginSrv.logout().subscribe(
            (response) => {
                this.router.navigate(['/']);
            },
            (error) => { console.log('err: ', error); }
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
