import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialogRef } from '@angular/material';

import { ShowErrorService } from './show-error.service';

@Component({
    templateUrl: './show-error.component.html',
    styleUrls: ['./show-error.component.scss']
})
export class ShowErrorDialog implements OnInit {
    private errorMessage: string;
    private textLabel: string;

    constructor(private router: Router, 
                private dialogRef: MdDialogRef<ShowErrorDialog>, 
                private showErrorSrv: ShowErrorService) { }

    ngOnInit() {
        this.errorMessage = this.showErrorSrv.getErrorMessage();
        this.textLabel = this.showErrorSrv.getTextLabel() || 'Ok';

        this.dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/home']);
        });
    }

}
