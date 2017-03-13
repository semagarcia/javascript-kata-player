import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { Challenge, ChallengeService, SocketService } from './../core';

import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {

    private config;
    private timeSpent: number;
    private counterDownObs: Observable<number>;
    private codePlayerA;
    private codePlayerB;
    private currentChallenge: Challenge;

    constructor(private route: ActivatedRoute, 
                private httpSrv: Http, 
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
        this.codePlayerA = '// Player A';
        this.codePlayerB = '// Player B';

        // Send start-streaming signal-message and join into a challenge room
        this.route.params.subscribe(params => {
            let challengeId = params['challengeId'];
            this.socketSrv.sendMessage('start-streaming', challengeId);
            this.challengeSrv.getChallengeInfo(challengeId).subscribe(
                (challenge) => { this.currentChallenge = challenge; }
            );
        });

        // Connect to streaming
        this.socketSrv.connectToStreaming().subscribe((data:any) => {
            if(data.who === this.currentChallenge.playerA) {
                this.codePlayerA = data.code;
            } else if(data.who === this.currentChallenge.playerB) {
                this.codePlayerB = data.code;
            }
        });
    }

}
