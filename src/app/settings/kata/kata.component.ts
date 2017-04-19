import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { KataDialogComponent } from './kata-dialog/kata-dialog.component';
import { KataService } from './../../core';
import { ShowErrorService, DIALOG_ACTIONS } from './../../dialogs';
import { SettingsAgGridMaterialCheckbox } from './../settings-ag-grid-checkbox';

import { GridOptions } from 'ag-grid/main';

@Component({
    selector: 'settings-kata',
    templateUrl: './kata.component.html',
    styleUrls: ['./kata.component.scss']
})
export class KataComponent implements OnInit {

    private gridOptions: GridOptions = {};

    constructor(private dialog: MdDialog, private kataSrv: KataService, private showErrorSrv: ShowErrorService) { 
        // Default options
        this.gridOptions.defaultColDef = { 
            width: 50,
            editable: true,
            filter: 'text'
        };
        
        // Configure grid
        this.gridOptions.rowHeight = 48;
        this.gridOptions.editType = 'fullRow';
        this.gridOptions.animateRows = true;
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableColResize = true;
        //this.gridOptions.singleClickEdit = true;
        this.gridOptions.stopEditingWhenGridLosesFocus = true;
        this.gridOptions.sortingOrder = ['desc', 'asc', null];
        this.gridOptions.rowSelection = 'multiple';
        this.gridOptions.icons = {
            checkboxChecked: SettingsAgGridMaterialCheckbox.CB_ICON
        };

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
                width: 25
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
                width: 200,
                filter: 'text'
            },
            {
                headerName: 'Examples',
                field: 'examples',
                width: 140,
                filter: 'text'
            },
            {
                headerName: 'Enabled?',
                field: 'enabled',
                width: 65,
                cellRenderer: (params) => { return (params.value) ? 'Yes' : 'No' },
                cellEditor: 'select',
                cellEditorParams: {
                    values: ['Yes', 'No']
                },
                cellClass: 'center-column-content'
            },
            {
                headerName: 'Updated',
                field: 'updatedAt',
                width: 100,
                filter: 'date',
                editable: false
            }
        ];
    }

    ngOnInit() {
        this.kataSrv.getAllKatas().subscribe(
            (katas) => { 
                this.gridOptions.api.addItems(katas);
                this.gridOptions.api.sizeColumnsToFit();
            },
            (err) => { 
                this.showErrorSrv.showErrorInDialog(
                    'Ups! An error has occurred...',
                    'Sorry, an error has been occurred retrieving the training paths...', 
                    DIALOG_ACTIONS.NOP,
                    '');
            }
        );
    }

    createNewKata() {
        this.dialog.open(KataDialogComponent).afterClosed().subscribe((x) => {
            console.log('Cerrado', x);
        });
    }

    editKata() {

    }

    deleteKatas() {
        console.log(this.gridOptions.api.getSelectedRows());
    }

}
