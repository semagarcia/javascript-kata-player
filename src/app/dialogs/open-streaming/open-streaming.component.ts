import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './open-streaming.component.html'
})
export class OpenStreamingDialog implements OnInit {

    challengeId: string;
    isEmptyChallengeId: boolean;

    constructor(public dialogRef:MdDialogRef<OpenStreamingDialog>) {}

    ngOnInit() {
        this.isEmptyChallengeId = false;
    }

    joinToChallenge() {
        if(this.challengeId) {
            this.dialogRef.close(this.challengeId);
        } else {
            this.isEmptyChallengeId = true;
        }
    }

    cancel() {
        this.dialogRef.close();
    }

}