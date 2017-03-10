import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './create-challenge.component.html'
})
export class CreateChallengeDialog implements OnInit {

    private joinForm: boolean;
    private isCreatingChallenge: boolean;

    constructor(public dialogRef: MdDialogRef<CreateChallengeDialog>) {}

    ngOnInit() {
        this.joinForm = false;
        this.isCreatingChallenge = false;
    }

    createChanllenge() {
        this.showProgressBar(); 
        this.joinForm = false;
        //this.dialogRef.close(true);   
    }

    showJoinToChallengeForm() {
        this.joinForm = !this.joinForm;
        this.hideProgressBar();
    }

    joinToChallenge() {
        //this.dialogRef.close(false);
        this.showProgressBar();
    }

    private showProgressBar() {
        this.isCreatingChallenge = true;
    }

    private hideProgressBar() {
        this.isCreatingChallenge = false;
    }

}