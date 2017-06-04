import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable, Subject }  from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { Challenge, ChallengeService, Kata, KataService, SocketService, TimeElapsedPipe, UserService } from './../core';

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
    private kata: Kata;
    private codeChanged: Subject<string> = new Subject<string>();

    constructor(private httpSrv: Http, 
                private route: ActivatedRoute,
                private challengeSrv: ChallengeService, 
                private kataSrv: KataService,
                private socketSrv: SocketService, 
                private userSrv: UserService,
                public dialog: MdDialog) {}

    ngOnInit() {
        this.showEditorPane = false;
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;
        this.code = '';
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: 'javascript', json: true },
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

            this.userSrv.getUserContext()
                .then((user) => {
                    // When the user enter to the challenge view, send this request to register itself as a
                    // opponent; the server will return either the user is playerA or playerB
                    this.challengeSrv.joinToChallengeRoom(
                            this.challengeId, 
                            user.username, 
                            this.socketSrv.getSocketId()).subscribe(
                        (challenge: Challenge) => { 
                            if(challenge) {
                                this.kataSrv.getKata(challenge.challengeKata).subscribe(
                                    (kata) => { this.kata = kata },
                                    (err) => { console.log('Error retrieving kata for challenge: ', err); }
                                );

                                this.socketSrv.sendMessage('challenge', {
                                    event: 'playerReady',
                                    challengeId: this.challengeId,
                                    playerName: user.username,
                                    data: 'Joined into challenge ' + this.challengeId
                                });
                                
                                this.socketSrv.connectToStreaming().subscribe(
                                    (data) => { console.log('Connected; received in challenge: ', data); },
                                    (err) => { console.log('Error connectionToStreaming(): ', err); }
                                );
                            } else {
                                console.log('Error joining');
                            }   
                        }
                    );
                })
                .catch((err) => { console.log('Error getUserContext(): ', err); });

            this.codeChanged
                .debounceTime(400)      // wait X ms after the last event
                .distinctUntilChanged()  // only emit if value is different from previous value
                .subscribe(code => {
                    this.socketSrv.sendMessage('challenge', {
                        event: 'codeUpdated',
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