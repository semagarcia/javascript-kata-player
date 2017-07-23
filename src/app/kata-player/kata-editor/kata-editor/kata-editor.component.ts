import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'kata-editor',
    templateUrl: './kata-editor.component.html',
    styleUrls: ['./kata-editor.component.scss']
})
export class KataEditorComponent implements OnInit {

    @Input() code;
    @Input() kataEditorConfig;
    @Output() codeUpdated = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    /**
     * Handles each update on the body function
     * @param functionImpl The current code implementation
     */
    onEditorChange(functionImpl) {
        if (typeof (functionImpl) === 'string') {
            this.codeUpdated.emit(functionImpl);
        }
    }

}
