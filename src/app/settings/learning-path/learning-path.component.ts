import { Component, OnInit } from '@angular/core';

import { TrainingService } from './../../core';

import { GridOptions } from 'ag-grid/main';

@Component({
  selector: 'settings-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit {

    private gridOptions: GridOptions = {};

    constructor(private trainingSrv: TrainingService) { 
        this.gridOptions.defaultColDef = { 
            width: 50,
            editable: false,
            filter: 'text'
        };
        this.gridOptions.animateRows = true;
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.sortingOrder = ['desc', 'asc', null];
        this.gridOptions.rowSelection = 'multiple';
        this.gridOptions.columnDefs = [
            {
                headerName: '', 
                field: 'selectRow',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                suppressFilter: true
            },
            {
                headerName: 'Topic',
                field: 'topic',
                width: 100,
                filter: 'text'
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
                filter: 'text'
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 100,
                filter: 'text'
            },
            {
                headerName: 'Enabled?',
                field: 'enabled',
                width: 100
            },
            {
                headerName: '# Katas',
                field: 'katas',
                width: 100,
                filter: 'number'
            },
            {
                headerName: 'Created',
                field: 'createdAt',
                width: 100,
                filter: 'date'
            },
            {
                headerName: 'Updated',
                field: 'updatedAt',
                width: 100,
                filter: 'date'
            }
        ];
    }

    autoSize() {
        this.gridOptions.api.sizeColumnsToFit();
    }

    ngOnInit() {
        this.trainingSrv.getTrainingPathsForGrid().subscribe(
            (trainingPaths) => { 
                this.gridOptions.api.addItems(trainingPaths);
            },
            (err) => { console.log('Show generic error loading data'); }
        );
    }

}
