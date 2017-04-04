import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { MdDialog } from '@angular/material';

import { LeaveChallengeComponent } from './../dialogs/leave-challenge/leave-challenge.component';
import { TimeElapsedPipe, TestExecutorService } from './../core';

import 'codemirror/mode/javascript/javascript';

//var electron = require('electron');
// require('node-notifier')

//const {[...], ipcMain, globalShortcut} = require('electron')
//ipcRenderer.on('keyboard-shortcut-Backspace', () => this.changeDir('..'));

declare var Notification;

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

    constructor(private httpSrv: Http, private testExecutorSrv: TestExecutorService, public dialog: MdDialog) {}

    ngOnInit() {
        this.showEditorPane = false;
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;
        this.code = 'function myTitleFunction(){\n\treturn 100;\n}';
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

        //this.sendNotification('Your kata has started!', 'Good luck with this kata! Read carefully and don\'t forget to test frequently');

        this.showEditorPane = true;
    }

    startExercise() {
        
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
                    this.sendNotification('Great work!! :-)', 'You have completed this kata successfully!!');
                }
            }
        );
    }

    stop() {
        this.dialog.open(LeaveChallengeComponent);
    }
    
    sendNotification(title, bodyMessage) {
        // ToDo: Externalizar en un serivicio e incluir control para electron
        // Notify the user kata has started
        Notification.requestPermission((permission) => {
            if(permission === 'granted') {
                var notification = new Notification(title, {
                    body: bodyMessage,
                    title: 'JavaScript Kata Player',
                    icon: '/src/favicon.ico',
                    // To prevent sound
                    //silent:true,
                });
            }
        });
    }

    onFocus() {
        //console.log('fcus: ', this.code);
    }

    onBlur() {
        //console.log('blur: ', this.code);
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