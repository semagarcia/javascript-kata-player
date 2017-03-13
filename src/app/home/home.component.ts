import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CreateChallengeDialog } from './../dialogs/create-challenge/create-challenge.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router, public dialog: MdDialog) { }

    startIndividual() {
        this.router.navigate(['/individual']);
    }

    startChallenge() {
        this.dialog.open(CreateChallengeDialog);
    }

}