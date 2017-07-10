import { Component, OnInit } from '@angular/core';

import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { Event, EventService } from './../../core';
import { AdminAgGridMaterialCheckbox } from './../admin-ag-grid-checkbox';

import { MdDialog, MdSnackBar, MdSnackBarRef, MdSnackBarConfig, SimpleSnackBar } from '@angular/material';
import { GridOptions } from 'ag-grid/main';
import * as moment from 'moment';

@Component({
    selector: 'admin-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
    snackBarRef: MdSnackBarRef<SimpleSnackBar>;
    auxEditRow: any;
    gridOptions: GridOptions = {};

    constructor(private dialog: MdDialog, private snackBar: MdSnackBar, private eventSrv: EventService) {
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
            this.auxEditRow = Object.assign({}, event.node.data);
        };

        this.gridOptions.onRowEditingStopped = (event) => {
            if(!this.isTheSameEventRow(this.auxEditRow, event.node.data))
                this.editEvent(event.node.data);
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
                width: 130,
                filter: 'text'
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 250,
                filter: 'text'
            },
            {
                headerName: 'Start date',
                field: 'date.startDate',
                width: 80,
                filter: 'date',
                cellRenderer: this.formatDate,
                cellClass: 'center-column-content'
            },
            {
                headerName: 'End date',
                field: 'date.endDate',
                width: 80,
                filter: 'date',
                cellRenderer: this.formatDate,
                cellClass: 'center-column-content'
            },
            {
                headerName: 'Where',
                field: 'urlLoc',
                width: 60,
                cellRenderer: this.buildGoogleMapsURL,
                cellEditor: 'text',
                cellClass: 'center-column-content',
                suppressMenu: true,
                suppressSorting: true,
                suppressToolPanel: true
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
        this.reload();
    }

    createNewEvent() {
        this.dialog.open(EventDialogComponent).afterClosed().subscribe((event) => {
            if(event) {  // Event created and not dismissed
                this.gridOptions.api.addItems(event);
                this.gridOptions.api.sizeColumnsToFit();
            }
        });
    }

    editEvent(event: Event) {
        if(event) {
            this.eventSrv.updateEvent(event).subscribe(
                (res) => { 
                    let config = new MdSnackBarConfig();
                    config.duration = 3500;
                    config.extraClasses = null;
                    this.snackBarRef = this.snackBar.open('Event modified successfully!', 'I got it!', config);
                    //this.snackBarRef.onAction().subscribe(() => { });
                 },
                (err) => { console.log(err); }
            );
        } else {
            let rowSelected = this.gridOptions.api.getSelectedNodes();
            this.gridOptions.api.setFocusedCell(rowSelected[0].rowIndex || 0, 'name');
            this.gridOptions.api.startEditingCell({
                rowIndex: rowSelected[0].rowIndex || 0,
                colKey: 'name'
            });
        }
    }

    deleteEvents() {
        let eventsToDelete = this.gridOptions.api.getSelectedNodes();
        if(eventsToDelete && eventsToDelete.length > 0) {
            let ids = eventsToDelete.map((e) => { return e.data._id });
            this.eventSrv.deleteEvents(ids).subscribe(
                (res: boolean) => {
                    this.gridOptions.api.removeItems(eventsToDelete);
                },
                (err) => { console.log(err); }
            );
        }
    }

    formatDate(params: {value: Date}) {
        //return (params.value) ? moment(params.value).format('L') : '--';
        let d = params.value;
        return (d) ? `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}` : '--';
    }

    buildGoogleMapsURL(params: any) {
        let url: string = params.value;
        if(!url) {
            return '';
        }
        if(!url.startsWith('http://') && !url.startsWith('https://'))
            url = 'https://'.concat(url);
        return `<a href="${url}" target="_blank"><i class="fa fa-map" aria-hidden="true"></i></a>`; 
    }

    isTheSameEventRow(modelA: Event, modelB: Event) {
        return (
            modelA.name === modelB.name && modelA.description === modelB.description &&
            modelA.date.start === modelB.date.start && modelA.date.end === modelB.date.end &&
            modelA.urlLoc === modelB.urlLoc && modelA.enabled && modelB.enabled
        );
    }

    reload() {
        this.eventSrv.getAllInfoOfEvents().subscribe(
            (events: Array<Event>) => { 
                if(events) {
                    this.gridOptions.api.setRowData(events);
                    this.gridOptions.api.hideOverlay();
                } else {
                    this.gridOptions.api.showNoRowsOverlay();
                }

                // Adjust the column size
                this.gridOptions.api.sizeColumnsToFit();
            },
            (err) => this.gridOptions.api.showNoRowsOverlay()
        );
    }

}
