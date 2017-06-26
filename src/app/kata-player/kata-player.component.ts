import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MdDialog, MdDialogRef } from '@angular/material';

import { KATA_PLAYER_ANIMATIONS } from './kata-player.animation';
import { KataService, KataPlayerStatus, TestExecutorService } from './../core';
import { LeaveChallengeComponent, WaitingChallengeDialog } from './../dialogs';

import 'codemirror/mode/javascript/javascript';

@Component({
    selector: 'kata-player',
    templateUrl: './kata-player.component.html',
    styleUrls: ['./kata-player.component.scss'],
    animations: KATA_PLAYER_ANIMATIONS
})
export class KataPlayerComponent implements OnInit, OnChanges {

    leftPaneWidth: number;
    resizingModeEnabled: boolean;
    bodyFunction: string;
    config: any;
    timeSpent: number;
    testResult: Array<String>;
    testResultOutput: string;
    counterDownObs: Subscription;
    attemps: number;
    tests: any;
    numberOfPassedTests: number;
    numberOfTests: number;
    waitingDialogRef: MdDialogRef<WaitingChallengeDialog>;

    @Input() title: string;
    @Input() explanation: string;
    @Input() examples: Array<string>;
    @Input() inputs: Array<string>;
    @Input() outputs: Array<string>;
    @Input() code: string;
    @Input() status: string;
    @Input('next-button') nextButton: boolean;

    @Output() success = new EventEmitter();
    @Output() fail = new EventEmitter();
    @Output() next = new EventEmitter();
    @Output() kataProgress = new EventEmitter();
    @Output() kataCancelled = new EventEmitter();
    @Output() codeUpdated = new EventEmitter();

    constructor(private kataSrv: KataService, 
                private testExecutorSrv: TestExecutorService,
                public dialog: MdDialog) {}

    ngOnInit() {
        this.timeSpent = 0;
        this.tests = {};
        this.numberOfPassedTests = 0;
        this.numberOfTests = 0;

        this.attemps = 0;
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;

        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            tabSize: 2,
            theme: 'material'
        };

        setTimeout(() => {
            this.waitingDialogRef = this.dialog.open(WaitingChallengeDialog, { disableClose: true });
            this.waitingDialogRef.afterClosed().subscribe(
                (shouldRedirectToHome) => {
                    if(shouldRedirectToHome) this.kataCancelled.emit();
                }
            );
        }, 0);
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.status && changes.status.currentValue) {
            // Status
            this.status = changes.status.currentValue;
            if(this.status === KataPlayerStatus.WAITING) {
                console.log('> WAITING');
            } else if(this.status === KataPlayerStatus.READING) {
                console.log('> READING');
                if(this.waitingDialogRef)
                    this.waitingDialogRef.close(false);
                this.startChronometer();
            } else if(this.status === KataPlayerStatus.WRITING) {
                console.log('> WRITING');
            }
        }
    }

    startChronometer() {
        this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
            this.timeSpent++;
        });
    }

    startExercise() {
        this.status = KataPlayerStatus.WRITING;
    }

    chronoEvent(evt: any) {
        //console.log('event! ', evt);
    }

    onEditorChange(evt: string) {
        if(typeof(evt) === 'string') {
            this.codeUpdated.emit(evt);
        }
    }

    testKata() {
        this.attemps++;
        if(this.status === KataPlayerStatus.WRITING) {
            this.testExecutorSrv.checkExerciseCode(this.code, this.title).subscribe(
                (result: any) => {
                    this.tests = result;
                    this.numberOfTests = this.tests.output.length;
                    this.numberOfPassedTests = this.tests.output.filter((o: any) => { return o.result }).length;
                    if(this.tests.executionResult) {
                        this.sendKataStats(true);
                        this.success.emit(this.timeSpent);
                    } else {
                        this.sendKataStats(false);
                    }
                }
            );
        }
    }

    sendKataStats(result: boolean) {
        let stats = {
            kata: this.title,
            status: result,
            attemps: this.attemps,
            time: this.timeSpent,
            tests: this.numberOfTests,
            passedTests: this.numberOfPassedTests
        };

        this.kataProgress.emit(stats);
        this.kataSrv.sendKataStats(stats);
    }

    openOrCloseTestCase(currentStatus: string) {
        if(currentStatus === 'opened') {
            return 'closed';
        } else {
            return 'opened';
        }
    }

    endKata() {
        //this.dialog.open(LeaveChallengeComponent);
        this.fail.emit();
    }

    nextExercise() {
        this.next.emit();
    }

    mousedown(e: any) {

    }

    mousemove(e: any) {

    }

    mouseup(e: any) {

    }

}