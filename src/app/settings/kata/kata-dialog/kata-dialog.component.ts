import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { KataService } from './../../../core';

@Component({
    selector: 'app-kata-dialog',
    templateUrl: './kata-dialog.component.html',
    styleUrls: ['./kata-dialog.component.scss'],
    animations: [
        trigger('formSteps', [
            state('step-1', style({
                transform: 'translate3d(0%, 0, 0)'
            })),
            state('step-2', style({
                transform: 'translate3d(-33.33%, 0, 0)'
            })),
            state('step-3', style({
                transform: 'translate3d(-66.66%, 0, 0)'
            })),
            transition('* => *', animate('400ms ease-in-out')),
            //transition('2 => 3', animate('400ms ease-in-out')),
            //transition('2 => 3', animate('400ms ease-in-out'))
        ]),
    ]
})
export class KataDialogComponent implements OnInit {

    private name: string;
    private description: string;
    private examples: string;
    private initialFnImpl: string;
    private stepIndex: string;

    // TODO: Implementar con ngForm en vez de con showError flag
    private showError: boolean;
    private showWaitingBackendCall: boolean;
    private errorMessage: string;

    constructor(private dialogRef: MdDialogRef<KataDialogComponent>, private kataSrv: KataService) { }

    ngOnInit() {
        this.stepIndex = 'step-1';

        //this.dialogRef.afterClosed().subscribe(() => {});
        this.showWaitingBackendCall = false;
        this.showError = false;
        this.errorMessage = '';
    }

    nextStep() {
        switch(this.stepIndex) {
            case 'step-1':
                this.stepIndex = 'step-2';
                break;
            case 'step-2':
                this.stepIndex = 'step-3';
                break;
        }
    }

    previousStep() {
        switch(this.stepIndex) {
            case 'step-2':
                this.stepIndex = 'step-1';
                break;
            case 'step-3':
                this.stepIndex = 'step-2';
                break;
        }
    }

    closeDialog() {
        this.dialogRef.close(null);
    }

    createLearningPath() {
        /*if(this.topic && this.name && this.description) {
            this.showWaitingBackendCall = true;
            this.showError = false;
            this.errorMessage = '';
            this.kataSrv.createTrainingPath(this.topic, this.name, this.description)
                .subscribe((addedTrainingPath) => {
                      alert(JSON.stringify(addedTrainingPath));
                      
                      // Cambiar el nombre del botón de "create" a "close"
                      // o cerrar directamente el dialog y refrescar la tabla con una nueva llamada
                      // o cerrar directamente y mostrar un snack toast de esos de abajo

                      // Cambiar el formato de fecha mostrado 
                });
        } else {
            this.showError = true;
            this.errorMessage = 'Sorry, to create a training path, you should fill all the required fields.';
            this.showWaitingBackendCall = false;
        }*/
    }

}
