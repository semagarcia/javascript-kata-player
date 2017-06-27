import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Challenge, ChallengeService, KataPlayerStatus, SocketService } from './../core';

import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {

    config: any;
    timeSpent: number;
    counterDownObs: Observable<number>;
    codePlayerA: string;
    codePlayerB: string;
    challengeId: string;
    currentChallenge: Challenge;
    challengeState: string;
    challengeProgress: {
        playerA: { state: string, tests: number, passedTests: number },
        playerB: { state: string, tests: number, passedTests: number }
    };

    constructor(private route: ActivatedRoute, 
                private challengeSrv: ChallengeService,
                private socketSrv: SocketService) {}

    ngOnInit() {
        // Global view config
        this.timeSpent = 0;
        this.counterDownObs = Observable.interval(1000);

        // Editor's config
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            readOnly: true,
            tabSize: 2,
            theme: 'material'
        };

        // Structure to hold the results
        this.challengeProgress = {
            playerA: {
                state: KataPlayerStatus.WAITING,
                tests: 0,
                passedTests: 0
            },
            playerB: {
                state: KataPlayerStatus.WAITING,
                tests: 0,
                passedTests: 0
            }
        };

        // Initialitate the code editors
        this.codePlayerA = '';
        this.codePlayerB = '';

        // Send challenge signal-message and join into a challenge room
        this.route.params.subscribe(params => {
            this.challengeId = params['challengeId'];

            this.socketSrv.sendMessage('challenge', {
                event: 'joinToChallenge',
                challengeId: this.challengeId
            });

            this.challengeSrv.getChallengeInfo(this.challengeId).subscribe(
                (challenge: Challenge) => this.currentChallenge = challenge
            );
        });

        // Connect to streaming
        this.socketSrv.connectToStreaming('challenge').subscribe((data: any) => {
            if(data.event === 'codeUpdated') {
                this.updateChallengeCode(data);
            } else if(data.event === 'playerReady') {
                // If the streaming players info is empty, request it again
                if(!this.currentChallenge.playerA && !this.currentChallenge.playerB) {
                    this.getChallengeInfo(data);
                } else if(this.currentChallenge.playerA && !this.currentChallenge.playerB) {
                    this.getChallengeInfo(data);
                } else {
                    this.updatePlayerNames(data);
                }
            } else if(data.event === 'startedChallenge') {
                this.challengeState = KataPlayerStatus.PLAYING;
                this.counterDownObs.subscribe((tick) => this.timeSpent++);
                this.challengeProgress.playerA.state = KataPlayerStatus.PLAYING;
                this.challengeProgress.playerB.state = KataPlayerStatus.PLAYING;
            } else if(data.event === 'challengeProgress') {
                console.log('str: ', data);
                if(data.playerId === this.currentChallenge.playerA) {
                    this.challengeProgress.playerA.tests = data.tests;
                    this.challengeProgress.playerA.passedTests = data.passedTests;
                    this.challengeProgress.playerA.state = (data.status) ? KataPlayerStatus.WINNER : KataPlayerStatus.PLAYING;
                } else if(data.playerId === this.currentChallenge.playerB) {
                    this.challengeProgress.playerB.tests = data.tests;
                    this.challengeProgress.playerB.passedTests = data.passedTests;
                    this.challengeProgress.playerB.state = (data.status) ? KataPlayerStatus.WINNER : KataPlayerStatus.PLAYING;
                }
            }
        });
    }

    /**
     * 
     * @param event 
     */
    chronoEvent(event) {

    }

    /**
     * Method to retrieve the most updated info about the callenge (with player IDs and usernames)
     * @param data WebSocket message
     */
    getChallengeInfo(data) {
        this.challengeSrv.getChallengeInfo(this.challengeId).subscribe(
            (challenge: Challenge) => {
                this.currentChallenge = challenge; 
                this.updatePlayerNames(data);
            }
        );
    }

    /**
     * Method to update the players' implementation body function
     * @param data WebSocket message
     */
    updateChallengeCode(data) {
        if(data.playerId === this.currentChallenge.playerA)
            this.codePlayerA = data.code;
        else if(data.playerId === this.currentChallenge.playerB)
            this.codePlayerB = data.code;
    }

    /**
     * Method to update the both challengees info fields
     * @param data WebSocket message
     */
    updatePlayerNames(data) {
        if(data.playerId === this.currentChallenge.playerA)
            this.currentChallenge.usernamePlayerA = data.who;
        else if(data.playerId === this.currentChallenge.playerB)
            this.currentChallenge.usernamePlayerB = data.who;
    }

}
