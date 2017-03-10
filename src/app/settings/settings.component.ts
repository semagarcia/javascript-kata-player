import { Component, OnInit } from '@angular/core';
import { MdTabChangeEvent } from '@angular/material';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    private tabIndex: number;

    constructor() { }

    ngOnInit() {
        this.tabIndex = 0;
    }

    changeTab(e: MdTabChangeEvent) {
        this.tabIndex = e.index;
    }

}
