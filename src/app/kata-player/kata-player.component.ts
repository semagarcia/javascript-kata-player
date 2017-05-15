import { Component, OnInit, OnChanges, Input, Output, EventEmitter, animate, state, style, transition, trigger 
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { KataService, TestExecutorService } from './../core';

import 'codemirror/mode/javascript/javascript';

@Component({
    selector: 'kata-player',
    templateUrl: './kata-player.component.html',
    styleUrls: ['./kata-player.component.scss'],
    animations: [
        trigger('startKata', [
            transition(':enter', [
                style({ opacity: 0 })
            ]),
            state('reading', style({
                opacity: 0
            })),
            state('writing', style({
                opacity: 1
            })),
            transition('* => *', animate('400ms ease-in-out'))
        ]),
        trigger('unitTestCase', [
            state('null', style({
                display: 'none',
                height: 0
            })),
            state('closed', style({
                display: 'none',
                height: 0
            })),
            state('opened', style({
                display: 'block',
                height: '*'
            })),
            transition('null => closed', animate('400ms ease-in')),
            transition('opened => closed', animate('400ms ease-in')),
            transition('closed => opened', animate('400ms ease-out'))
        ])
    ]
})
export class KataPlayerComponent implements OnInit, OnChanges {

    private kataState: string = 'reading';
    private leftPaneWidth: number;
    private resizingModeEnabled: boolean;
    private bodyFunction;
    private config;
    private timeSpent: number;
    private testResult: Array<String>;
    private testResultOutput: string;
    private counterDownObs: Subscription;
    private attemps;

    @Input() title;
    @Input() explanation;
    @Input() examples;
    @Input() inputs;
    @Input() outputs;
    @Input() code;
    @Input('next-button') nextButton;
    @Output() success = new EventEmitter();
    @Output() fail = new EventEmitter();
    @Output() next = new EventEmitter();

    private tests: any;
    private numberOfPassedTests: number;
    private numberOfTests: number;

    constructor(private kataSrv: KataService, private testExecutorSrv: TestExecutorService, public dialog: MdDialog) {
        this.kataState = 'reading';
    }

    ngOnInit() {
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

        this.timeSpent = 0;
        this.counterDownObs = Observable.timer(0, 1000).subscribe((tick) => {
            this.timeSpent++;
        });
    }

    ngOnChanges() {
        this.timeSpent = 0;
        this.bodyFunction = this.code;
    }

    startExercise() {
        this.kataState = 'writing';
    }

    testKata() {
        this.attemps++;
        if(this.kataState === 'writing') {
            this.testExecutorSrv.checkExerciseCode(this.bodyFunction, this.title).subscribe(
                (result: any) => {
                    this.tests = result;
                    this.numberOfTests = this.tests.output.length;
                    this.numberOfPassedTests = this.tests.output.filter((o) => { return o.result }).length;
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
        this.kataSrv.sendKataStats({
            kata: this.title,
            status: result,
            attemps: this.attemps,
            time: this.timeSpent
        });
    }

    openOrCloseTestCase(currentStatus) {
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

    mousedown(e) {

    }

    mousemove(e) {

    }

    mouseup(e) {

    }

}