import { Component, OnInit } from '@angular/core';

import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User, UsersService } from './../../core';
import { SettingsAgGridMaterialCheckbox } from './../settings-ag-grid-checkbox';

import { MdDialog } from '@angular/material';
import { GridOptions } from "ag-grid/main";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    
    gridOptions: GridOptions = {};

    constructor(private dialog: MdDialog, private usersSrv: UsersService) {
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
            checkboxChecked: SettingsAgGridMaterialCheckbox.CB_ICON
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
                headerName: 'Username',
                field: 'username',
                width: 120,
                filter: 'text'
            },
            {
                headerName: 'Name',
                field: 'name',
                width: 150,
                filter: 'text'
            },
            {
                headerName: 'Rol',
                field: 'rol',
                width: 80,
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
        this.usersSrv.getAllUsers().subscribe(
            (users: Array<User>) => { 
                this.gridOptions.api.addItems(users);
                this.gridOptions.api.sizeColumnsToFit();
            },
            (err) => console.log(err)
        );
    }

    createNewUser() {
        this.dialog.open(UserDialogComponent).afterClosed().subscribe((x) => {
            console.log('Cerrado', x);
        });
    }

    editUser() {

    }

    deleteUsers() {

    }

}
