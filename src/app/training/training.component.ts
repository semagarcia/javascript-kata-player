import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TrainingService } from './../core';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

    private trainingPath: string;

    constructor(private router: Router, private route: ActivatedRoute, private trainingSrv: TrainingService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.trainingPath = params['path'];
            this.trainingSrv.getPathExercises(this.trainingPath).subscribe(
                (res) => { console.log(res); }
            );
        });
    }

}
