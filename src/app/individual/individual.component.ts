import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { Kata, KataPlayerStatus, IndividualService, NotificationService, TimeElapsedPipe, TestExecutorService } from './../core';

import 'codemirror/mode/javascript/javascript';

@Component({
    templateUrl: './individual.component.html',
    styleUrls: ['./individual.styles.css']
})
export class IndividualComponent implements OnInit {

    showEditorPane: boolean;
    leftPaneWidth: number;
    resizingModeEnabled: boolean;
    code: string;
    config: any;
    timeSpent: number;
    testResult: Array<String>;
    testResultOutput: string;
    counterDownObs: Subscription;
    kata: Kata;
    kataStatus: string = KataPlayerStatus.READING;

    constructor(private individualKataSrv: IndividualService, 
                private notificationSrv: NotificationService,
                private testExecutorSrv: TestExecutorService, 
                public dialog: MdDialog) {}

    ngOnInit() {
        this.timeSpent = 0;
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

        this.individualKataSrv.getRandomKata().subscribe(
            (kata: Kata) => {
                this.kata = kata;
                this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
                    this.timeSpent++;
                });
            },
            (err) => { /* CHANGE */ alert('error retrieving random katas'); }
        );
    }

    onSuccess() {
        this.notificationSrv.sendNotification('Individual kata', 'Congrats! Your implementation is correct :-)');
    }

    onKataCancelled(evt) {
        // Cancelling kata
        // ToDo: Are you sure you want to exit?
        console.log('Exiting from kata due to: ', evt);
    }

}