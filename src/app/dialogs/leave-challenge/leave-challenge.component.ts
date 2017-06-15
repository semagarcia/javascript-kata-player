import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-leave-challenge',
    templateUrl: './leave-challenge.component.html',
    styleUrls: ['./leave-challenge.component.scss']
})
export class LeaveChallengeComponent {

    constructor(private router: Router, public dialogRef: MdDialogRef<LeaveChallengeComponent>) { }

    exit() {
        this.router.navigate(['/home']);
        this.dialogRef.close();
    }

}
