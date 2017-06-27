import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Observable, Subject }  from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { 
    Challenge, ChallengeService, Kata, KataPlayerStatus, KataService, NotificationService,
    SocketService, TimeElapsedPipe, UserService 
} from './../core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'codemirror/mode/javascript/javascript';

@Component({
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.styles.scss']
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
    kataPlayerStatus: string;
    codeChanged: Subject<string> = new Subject<string>();

    constructor(private challengeSrv: ChallengeService, 
                private httpSrv: Http, 
                private kataSrv: KataService,
                private notificationSrv: NotificationService,
                private route: ActivatedRoute,
                private router: Router,
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
        this.kataPlayerStatus = KataPlayerStatus.WAITING;

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
                                
                                this.socketSrv.connectToStreaming('challenge').subscribe(
                                    (data: any) => this.processMessageReceived(data),
                                    (err) => { 
                                        console.log('Error connectionToStreaming(): ', err); 
                                    }
                                );

                                this.socketSrv.sendMessage('challenge', {
                                    event: 'playerReady',
                                    challengeId: this.challengeId,
                                    playerName: user.username,
                                    playerId: this.socketSrv.getSocketId()
                                });
                            } else {
                                console.log('Error joining');
                            }   
                        }
                    );

                    // Editor implementation code subscription
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

    /**
     * Method to process the websocket message received
     * @param wsMessage WebSocket message
     */
    processMessageReceived(wsMessage) {
        if(wsMessage && wsMessage.event === 'playerReady') {
            this.kataPlayerStatus = KataPlayerStatus.WAITING;
        } else if(wsMessage && wsMessage.event === 'startedChallenge' && wsMessage.status === 'READY') {
            this.kataPlayerStatus = KataPlayerStatus.READING;
            this.counterDownObs = Observable.interval(1000);
            this.counterDownObs.subscribe((tick) => this.timeSpent++);
        }
    }

    /**
     * Method to open a popup dialog to ask if the user is sure to abandone the challenge
     */
    stop() {
        this.dialog.open(LeaveChallengeComponent);
    }

    /**
     * When the user passes the challenge, show a notification
     */
    onSuccessKata() {
        this.notificationSrv.sendNotification(
            'Kata Challenge!', 
            `Congrats! You have passed the challenge for "${this.kata.name}" kata!`);
    }

    /**
     * 
     * @param codeUpdated 
     */
    onChange(codeUpdated) {
        this.codeChanged.next(codeUpdated);
    }

    /**
     * 
     * @param progressStats 
     */
    onKataProgress(progressStats) {
        progressStats.event = 'challengeProgress';
        progressStats.challengeId = this.challengeId;
        this.socketSrv.sendMessage('challenge', progressStats);
    }

    /**
     * 
     * @param evt 
     */
    onKataCancelled(evt) {
        // TODO: Notify backend
        this.router.navigateByUrl('/home');
    }

}