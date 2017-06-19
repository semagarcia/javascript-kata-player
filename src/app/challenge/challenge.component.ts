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

    showEditorPane: boolean;
    leftPaneWidth: number;
    resizingModeEnabled: boolean;
    config: any;
    timeSpent: number;
    testResult: Array<String>;
    testResultOutput: string;
    counterDownObs: Observable<number>;
    challengeId: string;
    kata: Kata;
    codeChanged: Subject<string> = new Subject<string>();

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

        // Get the challengeId from the url
        this.route.params.subscribe(params => {
            this.challengeId = params['challengeId'];
            this.userSrv.getUserContext()
                .then((user: { username: string }) => {
                    // When the user enter to the challenge view, send this request to register itself as a
                    // opponent; the server will return either the user is playerA or playerB
                    this.challengeSrv.joinToChallengeRoom(
                            this.challengeId, 
                            user.username, 
                            this.socketSrv.getSocketId()
                    ).subscribe(
                        (challenge: Challenge) => { 
                            if(challenge) {
                                this.kataSrv.getKata(challenge.challengeKata).subscribe(
                                    (kata: Kata) => { this.kata = kata },
                                    (err) => { console.log('Error retrieving kata for challenge: ', err); }
                                );

                                this.socketSrv.sendMessage('challenge', {
                                    event: 'playerReady',
                                    challengeId: this.challengeId,
                                    playerName: user.username,
                                    playerId: this.socketSrv.getSocketId()
                                });
                                
                                this.socketSrv.connectToStreaming('challenge').subscribe(
                                    (data: any) => { 
                                        if(data && data.event === 'startedChallenge' && data.event === 'READY') {
                                            //this.challengeStatus = data.event;
                                            this.counterDownObs.subscribe((tick) => this.timeSpent++);
                                        }
                                    },
                                    (err) => { 
                                        console.log('Error connectionToStreaming(): ', err); 
                                    }
                                );
                            } else {
                                console.log('Error joining');
                            }   
                        }
                    );

                    //
                    this.codeChanged
                        .debounceTime(750)      // wait X ms after the last event
                        .distinctUntilChanged()  // only emit if value is different from previous value
                        .subscribe(code => {
                            this.socketSrv.sendMessage('challenge', {
                                event: 'codeUpdated',
                                challengeId: this.challengeId,
                                who: user.username,
                                code: code
                            });
                        }
                    );
                })
                .catch((err) => { console.log('Error getUserContext(): ', err); });
        });
    }

    testKata() {

    }

    stop() {
        this.dialog.open(LeaveChallengeComponent);
    }

    onChange(codeUpdated) {
        this.codeChanged.next(codeUpdated);
    }

    onSuccessKata() {

    }

    onFailedKataAttemp() {
        
    }

}