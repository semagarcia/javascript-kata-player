import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Challenge, ChallengeService, SocketService } from './../core';

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
    currentChallenge: Challenge;

    constructor(private route: ActivatedRoute, 
                private challengeSrv: ChallengeService,
                private socketSrv: SocketService) {}

    ngOnInit() {
        // Global view config
        this.timeSpent = 0;
        this.counterDownObs = Observable.interval(1000);
        this.counterDownObs.subscribe((tick) => {
            this.timeSpent++;
        });

        // Editor's config
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            readOnly: true,
            tabSize: 2,
            theme: 'material'
        };

        // Initialitate the code editors
        this.codePlayerA = '';
        this.codePlayerB = '';

        // Send challenge signal-message and join into a challenge room
        this.route.params.subscribe(params => {
            let challengeId = params['challengeId'];
            this.socketSrv.sendMessage('challenge', {
                event: 'joinToChallenge',
                challengeId: challengeId
            });
            this.challengeSrv.getChallengeInfo(challengeId).subscribe(
                (challenge: Challenge) => this.currentChallenge = challenge
            );
        });

        // Connect to streaming
        this.socketSrv.connectToStreaming().subscribe((data: any) => {
            if(data.event === 'codeUpdated') {
                if(data.who === this.currentChallenge.playerA)
                    this.codePlayerA = data.code;
                else
                    this.codePlayerB = data.code;
            } else if(data.event === 'playerReady') {
                if(data.playerId === this.currentChallenge.playerA)
                    this.currentChallenge.usernamePlayerA = data.playerName;
                else
                    this.currentChallenge.usernamePlayerB = data.playerName;
            }
        });
    }

}
