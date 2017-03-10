import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'codemirror/mode/javascript/javascript';

@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {

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
            readOnly: true,
            tabSize: 2,
            theme: 'material'
        };

        this.timeSpent = 0;
        this.counterDownObs = Observable.interval(1000);
        this.counterDownObs.subscribe((tick) => {
            this.timeSpent++;
        });
        this.showEditorPane = true;
    }

}
