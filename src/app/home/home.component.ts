import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { CreateChallengeDialog, SelectTrainingPathDialog } from './../dialogs';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    event: string;

    constructor(private router: Router, public dialog: MdDialog) { }

    ngOnInit() {
        /*this.userSrv.getUserContext()
            .then((user: {event: string}) => this.event = (user.event) ? user.event : '')
            .catch(() => this.event = '');*/
    }

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