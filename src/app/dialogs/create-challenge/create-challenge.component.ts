import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';
import { ChallengeService, SocketService } from './../../core';

@Component({
    templateUrl: './create-challenge.component.html'
})
export class CreateChallengeDialog implements OnInit {

    private joinForm: boolean;
    private challengeId: string;
    private existsChallengeId: boolean;
    private isCreatingChallenge: boolean;
    private joiningMessageError: string;

    constructor(private dialogRef: MdDialogRef<CreateChallengeDialog>, 
                private router: Router,
                private challengeSrv: ChallengeService,
                private socketSrv: SocketService) {}

    ngOnInit() {
        this.joinForm = false;
        this.existsChallengeId = true;
        this.isCreatingChallenge = false;
        this.joiningMessageError = '';
    }

    createChallenge() {
        this.showProgressBar(); 
        this.joinForm = false;
        let playerSocketId = this.socketSrv.getSocketId();
        if(playerSocketId) {
            this.challengeSrv.createChallengeId(playerSocketId).subscribe((challengeId) => { 
                this.challengeId = challengeId;
                this.isCreatingChallenge = false;
            });
        } else {
            this.isCreatingChallenge = false;
            this.joiningMessageError = 'ERR-SOCK-1000';
        }
    }

    goToChallenge() {
        this.router.navigate(['/challenge', this.challengeId]);
        this.dialogRef.close();
    }

    showJoinToChallengeForm() {
        this.joinForm = !this.joinForm;
        this.joiningMessageError = '';
        this.hideProgressBar();
    }

    joinToChallenge() {
        this.joiningMessageError = '';  
        if(this.challengeId) {
            this.challengeSrv.checkIfChallengeIdExists(this.challengeId).subscribe(
                (exists) => {
                    if(exists) {
                        this.router.navigate(['/challenge', this.challengeId]);
                        this.dialogRef.close();
                    } else {
                        this.existsChallengeId = exists;
                        this.joiningMessageError = 'Sorry, the given identifier not exists.';
                    }
                },
                (error) => {
                    this.joiningMessageError = error;
                }
            );
        } else {
            this.joiningMessageError = 'Please, you have to write a challenge identifier.';
        }
    }

    private closeDialog() {
        this.dialogRef.close();
    }

    private showProgressBar() {
        this.isCreatingChallenge = true;
    }

    private hideProgressBar() {
        this.isCreatingChallenge = false;
    }

}