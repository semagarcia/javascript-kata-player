import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { KataMetadata, TrainingService } from './../core';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
private x$: Observable<any>;
    private trainingPath: string;
    private trainingPathMetadata: KataMetadata;

    constructor(private router: Router, private route: ActivatedRoute, private trainingSrv: TrainingService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.trainingPath = params['path'];
            this.trainingSrv.getPathExercises(this.trainingPath).subscribe(
                (metadata: KataMetadata) => { this.trainingPathMetadata = metadata; }
            );
        });
    }

}
