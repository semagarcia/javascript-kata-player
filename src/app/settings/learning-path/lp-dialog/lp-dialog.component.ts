import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './lp-dialog.component.html',
    styleUrls: ['./lp-dialog.component.scss']
})
export class LpDialogComponent implements OnInit {

    constructor(private dialogRef: MdDialogRef<LpDialogComponent>) { }

    ngOnInit() {
        //this.dialogRef.afterClosed().subscribe(() => {});
    }

    createLearningPath() {

    }

}
