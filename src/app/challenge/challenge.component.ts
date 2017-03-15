import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable, Subject }  from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { ChallengeService, SocketService, TimeElapsedPipe } from './../core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'codemirror/mode/javascript/javascript';

@Component({
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.styles.css']
})
export class ChallengeComponent implements OnInit {

    private showEditorPane: boolean;
    private leftPaneWidth: number;
    private resizingModeEnabled: boolean;
    private code;
    private config;
    private timeSpent: number;
    private testResult: Array<String>;
    private testResultOutput: string;
    private counterDownObs: Observable<number>;
    private challengeId: string;
    private currentChallenge: object;
    private codeChanged: Subject<string> = new Subject<string>();

    constructor(private httpSrv: Http, 
                private route: ActivatedRoute,
                private challengeSrv: ChallengeService, 
                private socketSrv: SocketService, 
                public dialog: MdDialog) {}

    ngOnInit() {
        this.showEditorPane = false;
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;
        this.code = 'function myTitleFunction(){\n\treturn 100;\n}';
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            tabSize: 2,
            theme: 'material'
        };

        this.timeSpent = 0;
        this.showEditorPane = true;
        this.counterDownObs = Observable.interval(1000);
        this.counterDownObs.subscribe((tick) => {
            this.timeSpent++;
        });

        // Get the challengeId from the url
        this.route.params.subscribe(params => {
            this.challengeId = params['challengeId'];

            // When the user enter to the challenge view, send this request to register itself as a
            // opponent; the server will return either the user is playerA or playerB
            this.challengeSrv.joinToChallengeRoom(this.challengeId, this.socketSrv.getSocketId()).subscribe(
                (challenge) => { this.currentChallenge = challenge; }
            );

            this.codeChanged
                .debounceTime(600)      // wait X ms after the last event
                .distinctUntilChanged()  // only emit if value is different from previous value
                .subscribe(code => {
                    this.socketSrv.sendMessage('code', {
                        player: this.socketSrv.getSocketId(),
                        challengeId: this.challengeId,
                        code: code
                    });
                }
            );
        });
    }

    testKata() {

    }

    stop() {
        this.dialog.open(LeaveChallengeComponent);
    }

    onChange() {
        this.codeChanged.next(this.code);
    }

}