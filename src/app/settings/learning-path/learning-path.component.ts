import { Component, OnInit } from '@angular/core';

import { TrainingService } from './../../core';
import { ShowErrorService, DIALOG_ACTIONS } from './../../dialogs';

import { GridOptions } from 'ag-grid/main';

@Component({
  selector: 'settings-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit {

    private gridOptions: GridOptions = {};

    constructor(private trainingSrv: TrainingService, private showErrorSrv: ShowErrorService) { 
        // Default options
        this.gridOptions.defaultColDef = { 
            width: 50,
            editable: true,
            filter: 'text'
        };
        
        // Configure grid
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.animateRows = true;
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableColResize = true;
        //this.gridOptions.singleClickEdit = true;
        this.gridOptions.stopEditingWhenGridLosesFocus = true;
        this.gridOptions.sortingOrder = ['desc', 'asc', null];
        this.gridOptions.rowSelection = 'multiple';

        //
        this.gridOptions.onCellEditingStarted = (event) => {
            console.log('cellEditingStarted');
        };
        this.gridOptions.onCellEditingStopped = (event) => {
            console.log('cellEditingStopped', event);
        };

        this.gridOptions.columnDefs = [
            {
                headerName: '', 
                field: 'selectRow',
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true,
                suppressFilter: true,
                width: 20
            },
            {
                headerName: 'Topic',
                field: 'topic',
                width: 80,
                filter: 'text',
                cellClass: 'center-column-content'
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 100,
                filter: 'text',
                cellClass: 'center-column-content'
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200,
                filter: 'text',
                cellClass: 'center-column-content'
            },
            {
                headerName: 'Enabled?',
                field: 'enabled',
                width: 60,
                cellRenderer: (params) => { return (params.value) ? 'Yes' : 'No' },
                cellEditor: 'select',
                cellEditorParams: {
                    values: ['Yes', 'No']
                },
                cellClass: 'center-column-content'
            },
            {
                headerName: '# Katas',
                field: 'katas',
                width: 60,
                filter: 'number',
                editable: false,
                cellClass: 'center-column-content'
            },
            {
                headerName: 'Updated',
                field: 'updatedAt',
                width: 100,
                filter: 'date',
                editable: false,
                cellClass: 'center-column-content'
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
                this.showErrorSrv.showErrorInDialog(
                    'Sorry, an error has been occurred retrieving the training paths...', 
                    DIALOG_ACTIONS.NOP,
                    '');
            },
            (err) => { 
            }
        );
    }

}
