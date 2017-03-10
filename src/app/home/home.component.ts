import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { CreateChallengeDialog } from './../dialogs/create-challenge/create-challenge.component';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {

    selectedOption: string;

    constructor(private router: Router, public dialog: MdDialog) { }

    startIndividual() {
        this.router.navigate(['/individual']);
    }

    startChallenge() {
        let dialogRef = this.dialog.open(CreateChallengeDialog);
        dialogRef.afterClosed().subscribe(result => {
            //this.selectedOption = result;
            console.log('result: ', result);
        });
    }

}