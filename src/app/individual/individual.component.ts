import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { Kata, KataPlayerStatus, IndividualService, TimeElapsedPipe, TestExecutorService } from './../core';

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
    kataStatus: string;

    constructor(private individualKataSrv: IndividualService, 
                private testExecutorSrv: TestExecutorService, 
                public dialog: MdDialog) {}

    ngOnInit() {
        this.timeSpent = 0;
        this.kataStatus = KataPlayerStatus.READING;
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

    onSuccessKata() {
        console.log('on success');

        // refactor => common/core service
        this.sendNotification('Individual kata', 'Congrats! Your implementation is correct :-)');  
    }

    onFailedKataAttemp() {
        console.log('on fail');
    }

    testKata() {
        this.testExecutorSrv.checkExerciseCode(this.code, this.kata.name).subscribe(
            (result: any) => {
                alert('individual.component -> revisar');
                console.log('Result: ', result);
                /*if(result.executionResult && result.output) {
                    this.testResultOutput = this.testExecutorSrv.formatOutput(result.output.split('\n'));
                } else if(result.executionResult && !result.output) {
                    this.testResultOutput = 'Not found nothing to test...';
                } else if(!result.executionResult) {
                    this.testResultOutput = this.testExecutorSrv.formatOutput(result.output.split('\n'));
                    this.counterDownObs.unsubscribe();
                }*/
            }
        );
    }

    sendNotification(title: string, body: string) {
        Notification.requestPermission().then(function(result) {
            new Notification(title, {
                body: body,
                icon: './assets/images/logo_javascript.png'
            });
        }); 
    }

}