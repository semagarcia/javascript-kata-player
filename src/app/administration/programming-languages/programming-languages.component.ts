import { Component, OnInit } from '@angular/core';
import { AdminAgGridMaterialCheckbox } from './../admin-ag-grid-checkbox';
import { GridOptions } from "ag-grid/main";

@Component({
    selector: 'admin-programming-languages',
    templateUrl: './programming-languages.component.html',
    styleUrls: ['./programming-languages.component.scss']
})
export class ProgrammingLanguagesComponent implements OnInit {

    gridOptions: GridOptions = {};

    constructor() { 
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
        this.gridOptions.singleClickEdit = false;
        this.gridOptions.stopEditingWhenGridLosesFocus = true;
        this.gridOptions.sortingOrder = ['desc', 'asc', null];
        this.gridOptions.rowSelection = 'multiple';
        this.gridOptions.icons = {
            checkboxChecked: AdminAgGridMaterialCheckbox.CB_ICON
        };

        this.gridOptions.onRowEditingStarted = (event) => {
            //this.auxEditRow = Object.assign({}, event.node.data);
        };

        this.gridOptions.onRowEditingStopped = (event) => {
            /*if(!this.isTheSameEventRow(this.auxEditRow, event.node.data))
                this.editEvent(event.node.data);*/
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
                headerName: 'Language',
                field: 'language',
                width: 120,
                filter: 'text'
            },
            {
                headerName: 'Enabled?',
                field: 'enabled',
                width: 70,
                cellRenderer: (params) => { return (params.value) ? 'Yes' : 'No' },
                cellEditor: 'select',
                cellEditorParams: {
                    values: ['Yes', 'No']
                },
                cellClass: 'center-column-content'
            }
        ];
    }

    ngOnInit() {
    }

    addNewLanguage() {

    }

    editLanguage() {

    }

    deleteLanguage() {

    }

}
