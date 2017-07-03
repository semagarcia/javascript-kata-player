import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { TrainingService } from './../../../core';

@Component({
    templateUrl: './lp-dialog.component.html',
    styleUrls: ['./lp-dialog.component.scss']
})
export class LpDialogComponent implements OnInit {

    topic: string;
    name: string;
    description: string;
    showWaitingBackendCall: boolean;
    showError: boolean;
    errorMessage: string;

    constructor(public dialogRef: MdDialogRef<LpDialogComponent>, private trainingSrv: TrainingService) { }

    ngOnInit() {
        //this.dialogRef.afterClosed().subscribe(() => {});
        this.showWaitingBackendCall = false;
        this.showError = false;
        this.errorMessage = '';
    }

    createLearningPath() {
        if(this.topic && this.name && this.description) {
            this.showWaitingBackendCall = true;
            this.showError = false;
            this.errorMessage = '';
            this.trainingSrv.createTrainingPath(this.topic, this.name, this.description)
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
        }
    }

}
