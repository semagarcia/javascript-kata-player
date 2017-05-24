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
    private counterDirection: string;
    private challengeTimeDuration: number;
    private challengeMode: string;
    private existsChallengeId: boolean;
    private isCreatingChallenge: boolean;
    private isWaitingResponse: boolean;
    private joiningMessageError: string;

    constructor(private dialogRef: MdDialogRef<CreateChallengeDialog>, 
                private router: Router,
                private challengeSrv: ChallengeService,
                private socketSrv: SocketService) {}

    ngOnInit() {
        this.joinForm = false;
        this.challengeMode = 'SYNC';
        this.existsChallengeId = true;
        this.isCreatingChallenge = false;
        this.isWaitingResponse = false;
        this.joiningMessageError = '';
    }

    showCreateChallengeForm() {
        this.isCreatingChallenge = true;
        this.joinForm = false;
    }

    showJoinToChallengeForm() {
        this.isCreatingChallenge = false;
        this.joinForm = true;
        this.joiningMessageError = '';
        this.hideProgressBar();
    }

    createChallenge() {
        this.showProgressBar(); 
        this.joinForm = false;
        this.joiningMessageError = '';
        if(this.counterDirection && this.challengeTimeDuration) {
            let playerSocketId = this.socketSrv.getSocketId();
            if(playerSocketId) {
                this.challengeSrv.createChallengeId(
                        playerSocketId, 
                        this.counterDirection, 
                        this.challengeTimeDuration,
                        this.challengeMode
                ).subscribe((challengeId) => { 
                    this.challengeId = challengeId;
                    this.isWaitingResponse = false;
                });
            } else {
                this.isWaitingResponse = false;
                this.joiningMessageError = 'ERR-SOCK-1000';
            }
        } else {
            this.isWaitingResponse = false;
            this.joiningMessageError = 'You have to fill the required fields';
        }
    }

    goToChallenge() {
        this.router.navigate(['/challenge', this.challengeId]);
        this.dialogRef.close();
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
        this.isWaitingResponse = true;
    }

    private hideProgressBar() {
        this.isWaitingResponse = false;
    }

}