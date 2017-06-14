import { Component, OnInit } from '@angular/core';
import { MdTabChangeEvent } from '@angular/material';

import { TrainingService } from './../core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

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
