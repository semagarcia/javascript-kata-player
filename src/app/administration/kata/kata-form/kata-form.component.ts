import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    tests: Array<any>;
    enabled: boolean;

    code: string;
    config: any;
    showEditor: boolean;

    constructor(private routerSrv: Router) { 
        // Initialize values
        this.tests = [];
        this.enabled = true;
        this.showEditor = false;
        this.code = 'Your signature here...';
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

    addNewTestCase() {
        this.tests.push({ input: '', output: '' });
    }

    closeTestCase(indexTestCase) {
        this.tests.splice(indexTestCase, 1);
    }

    addKata() {
        // Check test cases
        /*for(let idx=this.tests.length; idx>=0; idx--) {
            if(this.tests[idx].input === '' || this.tests[idx].output === '') {
                this.tests.splice(idx, 1);
            }
        }*/
        for(let idx = 0; idx<this.tests.length; idx++) {
            if(this.tests[idx].input === '' || this.tests[idx].output === '') {
                this.tests.splice(idx, 1);
            }
        }
        console.log('tests: ', this.tests);
        
    }

    cancel() {
        this.routerSrv.navigateByUrl('/administration/katas');
    }

}
