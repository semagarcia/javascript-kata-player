import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'codemirror/mode/javascript/javascript';

@Component({
    templateUrl: './individual.component.html',
    styleUrls: ['./individual.styles.css']
})
export class IndividualComponent implements OnInit {

    private leftPaneWidth: number;
    private resizingModeEnabled: boolean;
    private code;
    private config;
    private timeSpent: number;
    private counterDownObs: Observable<number>;

    ngOnInit() {
        this.leftPaneWidth = 50;
        this.resizingModeEnabled = false;
        this.timeSpent = 0;
        this.counterDownObs = Observable.interval(1000);
        this.code = 'function myScript(){\n\treturn 100;\n}';
        this.config = {
            cursorBlinkRate: 200,
            lineNumbers: true,
            mode: { name: "javascript", json: true },
            tabSize: 2,
            theme: 'material'
        };
    }

    startKata() {
        this.counterDownObs.subscribe((tick) => {
            this.timeSpent++;
        });
    }

    onFocus() {
        console.log('fcus: ', this.code);
    }

    onBlur() {
        console.log('blur: ', this.code);
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