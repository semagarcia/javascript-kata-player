import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { TimeElapsedPipe, TestExecutorService } from './../core';

import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'kata-player',
  templateUrl: './kata-player.component.html',
  styleUrls: ['./kata-player.component.scss']
})
export class KataPlayerComponent implements OnInit, OnChanges {

    private showEditorPane: boolean;
    private leftPaneWidth: number;
    private resizingModeEnabled: boolean;
    private bodyFunction;
    private config;
    private timeSpent: number;
    private testResult: Array<String>;
    private testResultOutput: string;
    private counterDownObs: Subscription;

    @Input() title;
    @Input() explanation;
    @Input() examples;
    @Input() code;
    @Output() success = new EventEmitter();
    @Output() fail = new EventEmitter();
    @Output() next = new EventEmitter();

    constructor(private httpSrv: Http, private testExecutorSrv: TestExecutorService, public dialog: MdDialog) {}

    ngOnInit() {
        this.showEditorPane = false;
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;
        //this.bodyFunction = this.code;
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            tabSize: 2,
            theme: 'material'
        };

        this.timeSpent = 0;
        this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
            this.timeSpent++;
        });
 
        this.showEditorPane = true;
    }

    ngOnChanges() {
        this.timeSpent = 0;
        this.bodyFunction = this.code;
    }

    startExercise() {
        
    }

    testKata() {
        this.testExecutorSrv.checkExerciseCode(this.bodyFunction).subscribe(
            (result: any) => {
                if(result.executionResult && result.output) {
                    this.testResultOutput = this.testExecutorSrv.formatOutput(result.output.split('\n'));
                } else if(result.executionResult && !result.output) {
                    this.testResultOutput = 'Not found nothing to test...';
                } else if(!result.executionResult) {
                    this.testResultOutput = this.testExecutorSrv.formatOutput(result.output.split('\n'));
                    this.counterDownObs.unsubscribe();
                    this.success.emit(this.timeSpent);
                }
            }
        );
    }

    stop() {
        //this.dialog.open(LeaveChallengeComponent);
        this.fail.emit();
    }

    nextExercise() {
        this.next.emit();
    }

    mousedown(e) {
        //this.resizingModeEnabled = true;
    }

    mousemove(e) {
    }

    mouseup(e) {
        //this.resizingModeEnabled = false;
    }

}