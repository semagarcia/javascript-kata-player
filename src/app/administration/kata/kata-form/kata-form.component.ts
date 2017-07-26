import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-kata-form',
    templateUrl: './kata-form.component.html',
    styleUrls: ['./kata-form.component.scss']
})
export class KataFormComponent implements OnInit {

    programmingLang: string;
    programmingLanguages: Array<string>;
    learningPath: string;
    learningPaths: Array<string>;
    name: string;
    functionSignature: string;
    description: string;
    examples: Array<string>
    //input/outputs
    //tests
    enabled: boolean;

    code: string;
    config: any;
    showEditor: boolean;

    constructor() { 
        // Initialize values
        this.enabled = true;
        this.code = 'Your signature here...';
        this.showEditor = false;
    }

    ngOnInit() {
        this.programmingLanguages = [
            'JavaScript',
            'Cobol',
            'MUMPS'
        ];
        this.learningPaths = [
            'Functions',
            'Variables',
            '...'
        ];
    }

    onLanguageProgrammingChange(mdSelectChange) {
        this.showEditor = false;
        if(mdSelectChange.value.toLowerCase() === 'cobol') {
            this.code = '* Your Cobol signature here';
            this.config = {
                lineNumbers: true,
                matchBrackets: true,
                mode: 'text/x-cobol',
                theme : "default",
                styleActiveLine: true,
                showCursorWhenSelecting : true
            };
        } else if(mdSelectChange.value.toLowerCase() === 'javascript') {
            this.code = '// Your JavaScript function signature here';
            this.config = {
                cursorBlinkRate: 200,
                lineNumbers: true,
                mode: { name: 'javascript', json: true },
                tabSize: 2,
                theme: 'material'
            };
        } else if(mdSelectChange.value.toLowerCase() === 'mumps') {
            this.code = '; Your Cobol signature here';
            this.config = {
                lineNumbers: true,
                mode: 'mumps',
                lineWrapping: true
            };
        }
        setTimeout(() => { this.showEditor = true; }, 0);
    }

}
