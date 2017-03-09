import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
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
    private t: string;
    private counterDownObs: Observable<number>;

    constructor(private httpSrv: Http) {}

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
        this.counterDownObs = Observable.interval(1000);
        this.counterDownObs.subscribe((tick) => {
            this.timeSpent++;
        });

        // Notify the user kata has started
        Notification.requestPermission((permission) => {
            if(permission === 'granted') {
                var notification = new Notification('Your kata has started!', {
                    body: 'Good luck with this kata! Read carefully and don\'t forget to test frequently',
                    title: 'JavaScript Kata Player',
                    icon: '/src/favicon.ico',
                    // To prevent sound
                    //silent:true,
                });
            }
        });

        this.showEditorPane = true;
    }

    startExercise() {
        
    }

    testKata() {
        this.httpSrv.post('http://localhost:3000/kata', { function: this.code })
            .toPromise()
            .then((res) => { 
                this.testResult = [];
                let result = res.json().res.split('\n');
                result.forEach(line => {
                    if(line.match(/^\s+\d\)/g)) {  // List specs
                        line = `<span class="test-line-error">${line}</span>`;
                    } else if(line.match(/passing/g)) {  // Passing tests
                        line = `<span class="test-line-successful">${line}</span>`;
                    } else if(line.match(/failing/g)) {  // Failing tests
                        line = `<span class="test-line-error">${line}</span>`;
                    }

                    // Check for successful tests
                    let checkCharacterFound = false;
                    line.split('').forEach(letter => {
                        if(letter.charCodeAt(0) === 10003) { 
                            checkCharacterFound = true; 
                        }
                    });

                    if(checkCharacterFound) {
                        line = `<span class="test-line-successful">${line}</span>`;
                    }

                    // Add the line processed
                    this.testResult.push(line);
                });
                // Rebuild all the output with colors
                this.t = this.testResult.join('\n');
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    stop() {
        console.log('Stop()');
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