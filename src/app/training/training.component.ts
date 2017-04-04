import { Component, OnInit, animate, style, state, transition, trigger } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { KataExercise, TrainingService } from './../core';

@Component({
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

    private trainingPath: string;
    private currentExerciseIndex: number;
    private currentExercise: KataExercise;
    private pathExercises: Array<KataExercise>;
    private selectedExercise: string;
    private selectedValue: string;
    private trainingPathLength: number;

    constructor(private router: Router, private route: ActivatedRoute, private trainingSrv: TrainingService) { }

    ngOnInit() {
        this.currentExerciseIndex = 0;
        this.route.params.subscribe(params => {
            this.trainingPath = params['path'];
            this.trainingSrv.getPathExercises(this.trainingPath).subscribe(
                (exercises: Array<KataExercise>) => { 
                    // Copy all exercises
                    this.pathExercises = exercises;  
                    this.trainingPathLength = this.pathExercises.length;

                    // Select the first of them as initial exercise
                    this.currentExercise = exercises[this.currentExerciseIndex];
                    this.selectedValue = exercises[this.currentExerciseIndex].id;
                }
            );
        });
    }

    onSelectedChange(e) {
        let selected: KataExercise = this.pathExercises.filter(
            (exercise: KataExercise) => { return (exercise.id === e.value); }
        )[0];
        this.selectedValue = selected.name;
    }

    onSuccessKata() {

    }

    onFailedKataAttemp() {

    }

    onNextExercise() {
        this.nextExerciseIndex();
        this.currentExercise = this.pathExercises[this.currentExerciseIndex];
        this.selectedValue = this.pathExercises[this.currentExerciseIndex].id;
    }

    nextExerciseIndex() {
        this.currentExerciseIndex = (this.currentExerciseIndex !== this.pathExercises.length-1) ? ++this.currentExerciseIndex : 0; 
    }

}
