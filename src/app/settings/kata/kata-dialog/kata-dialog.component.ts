import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { KataService } from './../../../core';

@Component({
    selector: 'app-kata-dialog',
    templateUrl: './kata-dialog.component.html',
    styleUrls: ['./kata-dialog.component.scss']
})
export class KataDialogComponent implements OnInit {

    private name: string;
    private description: string;
    private examples: string;
    private initialFnImpl: string;
    private showError: boolean;
    private showWaitingBackendCall: boolean;
    private errorMessage: string;

    constructor(private dialogRef: MdDialogRef<KataDialogComponent>, private kataSrv: KataService) { }

    ngOnInit() {
        //this.dialogRef.afterClosed().subscribe(() => {});
        this.showWaitingBackendCall = false;
        this.showError = false;
        this.errorMessage = '';
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
