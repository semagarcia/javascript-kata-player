import { Component, OnInit } from '@angular/core';
import { MdTabChangeEvent } from '@angular/material';

import { TrainingService } from './../core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    trainingPaths: Array<any>;
    currentTabSelected: number;

    constructor(private trainingSrv: TrainingService) { }

    ngOnInit() {
        this.trainingSrv.getTrainingPaths().subscribe(
            (tPaths) => { this.trainingPaths = tPaths }
        );
    }

    onTabChanged(event: MdTabChangeEvent) {
        this.currentTabSelected = event.index;
    }

}
