import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { EventService } from './../../../core';

import moment from 'moment';

@Component({
    selector: 'app-event-dialog',
    templateUrl: './event-dialog.component.html',
    styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

    name: string;
    startDate: Date;
    endDate: Date;
    duration: boolean;
    description: string;
    urlMaps: string;

    // TODO: Implementar con ngForm en vez de con showError flag
    showError: boolean;
    showWaitingBackendCall: boolean;
    errorMessage: string;

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
