import { Component, OnInit, animate, style, state, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MdDialog } from '@angular/material';

import { TrainingService, TrainingPath, Kata } from './../core';
import { ShowErrorService, DIALOG_ACTIONS } from './../dialogs/';

@Component({
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

    topic: string;
    currentExercise: Kata;
    currentExerciseIndex: number;
    trainingPath: TrainingPath;
    selectedValue: string;
    trainingPathLength: number;

    constructor(private router: Router, private route: ActivatedRoute, 
                private dialog: MdDialog, 
                private trainingSrv: TrainingService, private showErrorSrv: ShowErrorService) { }

    ngOnInit() {
        this.currentExerciseIndex = 0;
        this.route.params.subscribe(params => {
            this.topic = params['topic'];
            this.trainingSrv.getKatasOfTrainingPath(this.topic).subscribe(
                (trainingPath: TrainingPath) => { 
                    if(trainingPath && trainingPath.katas && trainingPath.katas.length > 0) {
                        this.trainingPath = trainingPath;
                        this.trainingPathLength = trainingPath.katas.length;
                        this.currentExercise = trainingPath.katas[this.currentExerciseIndex];
                        this.selectedValue = trainingPath.katas[this.currentExerciseIndex].name;
                    } else {
                        this.showErrorSrv.showErrorInDialog(
                            'Ups! An error has occurred...',
                            'Sorry, an error has been occurred retrieving the training path...', 
                            DIALOG_ACTIONS.GO_HOME, 
                            'Go to home!');
                    }
                }
            );
        });
    }

    onSelectedChange(e: any) {
        let length = this.trainingPath.katas.length;
        for(let i=0; i<length; i++) {
            if(this.trainingPath.katas[i].name === e.value) {
                this.currentExercise = this.trainingPath.katas[i];
                this.selectedValue = this.trainingPath.katas[i].name;
                this.currentExerciseIndex = i;
            }
        }
    }

    onSuccessKata() {
        console.log('success');
    }

    onFailedKataAttemp() {
        console.log('failed');
    }

    onNextExercise() {
        this.updateExerciseIndex();
        this.currentExercise = this.trainingPath.katas[this.currentExerciseIndex];
        this.selectedValue = this.currentExercise.name;
    }

    updateExerciseIndex() {
        this.currentExerciseIndex = (this.currentExerciseIndex !== this.trainingPath.katas.length-1) 
            ? ++this.currentExerciseIndex 
            : 0;
    }

}
