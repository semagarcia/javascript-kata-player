import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
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
export class KataPlayerComponent implements OnInit, OnChanges, OnDestroy {

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
    @Output() nextExercise = new EventEmitter();
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
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.status && changes.status.currentValue) {
            // Status
            this.status = changes.status.currentValue;
            if(this.status === KataPlayerStatus.WAITING) {
                this.openWaitingOpponentDialog();
            } else if(this.status === KataPlayerStatus.READING) {
                if(this.waitingDialogRef)
                    this.waitingDialogRef.close(false);
                this.startChronometer();
            } else if(this.status === KataPlayerStatus.WRITING) {
                // WRITING status
            }
        }
    }

    /**
     * Open the "waiting opponent" dialog. If the user close it manually (cancel the challenge), throws 
     * a "kataCancelled" event to redirect to home view
     */
    openWaitingOpponentDialog() {
        setTimeout(() => {
            this.waitingDialogRef = this.dialog.open(WaitingChallengeDialog, { disableClose: true });
            this.waitingDialogRef.afterClosed().subscribe(
                (shouldRedirectToHome) => {
                    if(shouldRedirectToHome) this.kataCancelled.emit();
                }
            );
        }, 0);
    }

    /**
     * Initialize the choronometer and starts it
     */
    startChronometer() {
        this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
            this.timeSpent++;
        });
    }

    /**
     * Shows the editor panel
     */
    onStartExercise() {
        this.status = KataPlayerStatus.WRITING;
    }

    /**
     * Handles each tick of chronometer
     * @param timeValue Number of seconds elapsed
     */
    onChronoEvent(timeValue: any) {
        //console.log('event! ', timeValue);
    }

    /**
     * Handles each update on the body function
     * @param functionImpl The current code implementation
     */
    onEditorChange(functionImpl: string) {
        if(typeof(functionImpl) === 'string') {
            this.codeUpdated.emit(functionImpl);
        }
    }

    /**
     * Method to test the kata. When the user clicks on test button, the name and the implementation 
     * are sent to the server to be tested. The result received (test results and log) will be 
     * printed on the unit test panels.
     */
    onTestKata() {
        this.attemps++;
        if(this.status === KataPlayerStatus.WRITING) {
            this.testExecutorSrv.checkExerciseCode(this.code, this.title).subscribe(
                (result: any) => {
                    this.tests = result;
                    this.numberOfTests = this.tests.output.length;
                    this.numberOfPassedTests = this.tests.output.filter((o: any) => { return o.result }).length;
                    if(this.tests.executionResult) {
                        this.sendKataStatistics(true);
                        this.success.emit(this.timeSpent);
                    } else {
                        this.sendKataStatistics(false);
                    }
                }
            );
        }
    }

    /**
     * Method to send the statistics to the server
     * @param result The kata's implementation result
     */
    sendKataStatistics(result: boolean) {
        let stats = {
            kata: this.title,
            status: result,
            attemps: this.attemps,
            time: this.timeSpent,
            tests: this.numberOfTests,
            passedTests: this.numberOfPassedTests
        };

        // Throw up the stats
        this.kataProgress.emit(stats);

        // Send the stats to the server
        this.kataSrv.sendKataStats(stats);
    }

    /**
     * Method to toggle (open or close) the unit test results; if currentStatus is opened, the animation will
     * close the panel, and viceversa
     * @param currentStatus The current status of the unit test panel
     */
    openOrCloseTestCase(currentStatus: string) {
        return (currentStatus === 'opened') ? 'closed' : 'opened' ;
    }

    /**
     * When the user wants to cancel the kata and exits from individual mode
     */
    onEndKata() {
        //this.dialog.open(LeaveChallengeComponent);
        //this.fail.emit();
        this.kataCancelled.emit();
    }

    /**
     * When the kata-player is used inside of a training-path and the "next" button appears, this event
     * handler captures the click action and throw an event
     */
    onNextExercise() {
        this.nextExercise.emit();
    }

    ngOnDestroy() {
        this.kataCancelled.emit('exitKataComponent');
    }

}