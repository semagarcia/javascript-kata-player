import { Component, OnInit } from '@angular/core';
import { KataService, EventService } from './../core';
import { Event } from './../core/models/Event';
import { GridOptions } from 'ag-grid/main';
import { MdSelectChange } from '@angular/material';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

    gridOptions: GridOptions = {};
    rowIndex: number;
    selectedEventName: string;
    selectedEvent: Event;
    events: Array<Event>;

    constructor(private eventSrv: EventService, private kataSrv: KataService) {
        // Default options
        this.gridOptions.defaultColDef = { 
            width: 50,
            editable: false,
            filter: 'number'
        };
        
        // Configure grid
        this.rowIndex = 1;
        this.gridOptions.rowHeight = 48;
        //this.gridOptions.overlayNoRowsTemplate = 'No Rows';
        //this.gridOptions.overlayLoadingTemplate = 'Loading';
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.sortingOrder = ['desc', 'asc', null];

        // Column definitions
        this.gridOptions.columnDefs = [
            {
                headerName: 'Rank',
                valueGetter: (params: any) => { return this.rowIndex++;  },
                width: 90,
                filter: 'number'
            },
            {
                headerName: 'Name',
                field: 'username',
                width: 200,
                filter: 'text'
            },
            {
                headerName: 'Played time',
                field: 'totalTime',
                width: 100,
                filter: 'number'
            },
            {
                headerName: '# Katas',
                field: 'numOfKatas',
                width: 100,
                filter: 'number',
                sort: 'desc'
            },
            {
                headerName: '# Attemps',
                field: 'numOfAttemps',
                width: 100,
                filter: 'number'
            },
            {
                headerName: 'Passed katas',
                field: 'passed',
                width: 100,
                filter: 'number',
                sort: 'desc'
            },
            {
                headerName: 'Failed katas',
                field: 'failed',
                width: 100,
                filter: 'number'
            }
        ];
    }

    ngOnInit() {
        this.eventSrv.getCurrentEvents().subscribe(
            (events) => this.events = events
        );

        this.kataSrv.getKataStats().subscribe(
            (stats) => { 
                if(stats) {
                    this.gridOptions.api.setRowData(stats);
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

    onEventSelected(evt: MdSelectChange) {
        this.selectedEvent = this.events.find((e) => e.name === evt.value);
    }

    resetFilter() {
        this.selectedEvent = null;
        this.selectedEventName = null;
    }

}
