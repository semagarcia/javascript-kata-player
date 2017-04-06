import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { TrainingService, KataMetadata } from './../../core';

@Component({
    templateUrl: './select-training-path.component.html',
    styleUrls: ['./select-training-path.component.scss']
})
export class SelectTrainingPathDialog implements OnInit {

    private showError: boolean;
    private selected: KataMetadata;
    private selectedValue: string;
    private trainingPathsMetadata: Array<KataMetadata>;

    constructor(private dialogRef: MdDialogRef<SelectTrainingPathDialog>, 
        private router: Router,
        private trainingSrv: TrainingService) {}

    ngOnInit() {
        this.showError = false;
        this.trainingSrv.getTrainingPathsMetadata().subscribe(
            (metadata) => { this.trainingPathsMetadata = metadata; }
        );
    }

    startPath() {
        if(this.selectedValue) {
            this.router.navigate(['/training', this.selectedValue]);
            this.dialogRef.close();
        } else {
            this.showError = true;
        }
    }

    onSelectedChange(e) {
        let selected: Array<KataMetadata> = this.trainingPathsMetadata.filter(
            (path: KataMetadata) => { return (path.trainingPathId === e.value); }
        );

        if(selected[0]) {
            this.selected = selected[0];
            this.selectedValue = selected[0].trainingPathId;
            this.showError = false;
        } else {
            this.selectedValue = null;
            this.showError = true;
        }
    }

}