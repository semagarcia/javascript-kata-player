import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './waiting-challenge.component.html'
})
export class WaitingChallengeDialog {

    constructor(public dialogRef: MdDialogRef<WaitingChallengeDialog>) {}

}