import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { EventService } from './../../../core';

import * as moment from 'moment';

@Component({
    selector: 'app-event-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

    private name: string;
    private startDate: Date;
    private endDate: Date;
    private duration: boolean;
    private description: string;
    private urlMaps: string;

    // TODO: Implementar con ngForm en vez de con showError flag
    private showError: boolean;
    private showWaitingBackendCall: boolean;
    private errorMessage: string;

    constructor(private dialogRef: MdDialogRef<EventDialogComponent>, private eventSrv: EventService) { }

    ngOnInit() {
        this.showWaitingBackendCall = false;
        this.showError = false;
        this.errorMessage = '';
    }

    filterAfterNow(d: Date) {
        return d.getTime() >= moment().add(-1, 'days').valueOf();
    }

    createEvent() {
        if(this.name && this.startDate && this.description) {
            this.showWaitingBackendCall = true;
            this.showError = false;
            this.errorMessage = '';
            this.eventSrv.createEvent(this.name, this.startDate, this.description, this.urlMaps, this.endDate).subscribe(
                (result) => { this.dialogRef.close({ result: result }) },
                (err) => { this.errorMessage = err; }
            );
        } else {
            this.showError = true;
            this.errorMessage = 'Sorry, to create an event, you should fill all the required fields.';
            this.showWaitingBackendCall = false;
        }
    }

    closeDialog() {
        this.dialogRef.close(null);
    }
}
