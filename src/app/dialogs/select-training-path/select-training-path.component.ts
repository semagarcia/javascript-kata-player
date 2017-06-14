import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { TrainingService, TrainingPath } from './../../core';

@Component({
    templateUrl: './select-training-path.component.html',
    styleUrls: ['./select-training-path.component.scss']
})
export class SelectTrainingPathDialog implements OnInit {

    showError: boolean;
    selected: TrainingPath;
    selectedValue: string;
    trainingPaths: Array<TrainingPath>;

    constructor(
        public dialogRef: MdDialogRef<SelectTrainingPathDialog>, 
        private router: Router,
        private trainingSrv: TrainingService) {}

    ngOnInit() {
        this.showError = false;
        this.trainingSrv.getTrainingPaths().subscribe(
            (metadata) => { this.trainingPaths = metadata; }
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

    onSelectedChange(e: {value: string}) {
        let selected: TrainingPath = this.trainingPaths.find(
            (path: TrainingPath) => { return (path.topic === e.value); }
        );

        if(selected) {
            this.selected = selected;
            this.selectedValue = selected.topic;
            this.showError = false;
        } else {
            this.selectedValue = null;
            this.showError = true;
        }
    }

}