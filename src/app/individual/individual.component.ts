import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { Kata, TimeElapsedPipe, TestExecutorService } from './../core';

import 'codemirror/mode/javascript/javascript';

@Component({
    templateUrl: './individual.component.html',
    styleUrls: ['./individual.styles.css']
})
export class IndividualComponent implements OnInit {

    private showEditorPane: boolean;
    private leftPaneWidth: number;
    private resizingModeEnabled: boolean;
    private code;
    private config;
    private timeSpent: number;
    private testResult: Array<String>;
    private testResultOutput: string;
    private counterDownObs: Subscription;
    private kata: Kata;

    constructor(private httpSrv: Http, private testExecutorSrv: TestExecutorService, public dialog: MdDialog) {}

    ngOnInit() {
        this.timeSpent = 0;
        this.showEditorPane = false;
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;
        this.code = 'function addTwoNumbers(a, b){\n\treturn 100;\n}';
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            tabSize: 2,
            theme: 'material'
        };

        this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
            this.timeSpent++;
        });

        // Hardcoded kata (temporal)
        this.kata = {
            name: 'addTwoNumbers',
            description: 'Given two numbers, return the sum of both.',
            examples: ['* For a = 1, b = 2, the output should be 3.'],
            initialBodyFunction: 'function addTwoNumbers(a, b) {\n\treturn 100;\n}'
        };
    }

    onSuccessKata() {

    }

    onFailedKataAttemp() {

    }

    testKata() {
        this.testExecutorSrv.checkExerciseCode(this.code).subscribe(
            (result: any) => {
                if(result.executionResult && result.output) {
                    this.testResultOutput = this.testExecutorSrv.formatOutput(result.output.split('\n'));
                } else if(result.executionResult && !result.output) {
                    this.testResultOutput = 'Not found nothing to test...';
                } else if(!result.executionResult) {
                    this.testResultOutput = this.testExecutorSrv.formatOutput(result.output.split('\n'));
                    this.counterDownObs.unsubscribe();
                }
            }
        );
    }

}