import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { CreateChallengeDialog, SelectTrainingPathDialog } from './../dialogs';
import { UserService } from './../core/services/user.service';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    event: string;

    constructor(private router: Router, public dialog: MdDialog, public userSrv: UserService) { }

    ngOnInit() {
        this.event = this.userSrv.getUserContext().event;
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