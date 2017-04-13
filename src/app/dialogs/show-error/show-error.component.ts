import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';

import { DIALOG_ACTIONS } from './show-error-actions.enum';
import { ShowErrorService } from './show-error.service';

@Component({
    templateUrl: './show-error.component.html',
    styleUrls: ['./show-error.component.scss']
})
export class ShowErrorDialog implements OnInit {
    private dialogTitle: string;
    private errorMessage: string;
    private dialogAction: DIALOG_ACTIONS;
    private textLabel: string;

    constructor(private router: Router, 
                private dialogRef: MdDialogRef<ShowErrorDialog>, 
                private showErrorSrv: ShowErrorService) { }

    ngOnInit() {
        this.dialogTitle = this.showErrorSrv.getDialogTitle();
        this.errorMessage = this.showErrorSrv.getErrorMessage();
        this.dialogAction = this.showErrorSrv.getAction();
        this.textLabel = this.showErrorSrv.getTextLabel() || 'Ok';

        this.dialogRef.afterClosed().subscribe(() => {
            switch(this.dialogAction) {
                // Go home
                case DIALOG_ACTIONS.GO_HOME:
                    this.router.navigate(['/home']);
                    break;
                // No-op & default option
                case DIALOG_ACTIONS.NOP:
                default:
                    break;
            }
        });
    }

}
