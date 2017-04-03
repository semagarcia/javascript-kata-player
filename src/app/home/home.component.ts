import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CreateChallengeDialog, SelectTrainingPathDialog } from './../dialogs';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router, public dialog: MdDialog) { }

    startIndividual() {
        this.router.navigate(['/individual']);
    }

    startTraining() {
        this.dialog.open(SelectTrainingPathDialog);
    }

    startChallenge() {
        this.dialog.open(CreateChallengeDialog);
    }

}