import { Component, OnInit } from '@angular/core';
import { KataService } from './../core';

import { GridOptions } from 'ag-grid/main';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

    private gridOptions: GridOptions = {};
    private rowIndex: number;

    constructor(private kataSrv: KataService) {
        // Default options
        this.gridOptions.defaultColDef = { 
            width: 50,
            editable: false,
            filter: 'number'
        };
        
        // Configure grid
        this.rowIndex = 1;
        this.gridOptions.rowHeight = 48;
        this.gridOptions.enableSorting = true;
        this.gridOptions.enableColResize = true;
        this.gridOptions.sortingOrder = ['desc', 'asc', null];

        // Column definitions
        this.gridOptions.columnDefs = [
            {
                headerName: 'Rank',
                valueGetter: (params) => { return this.rowIndex++;  },
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
        this.kataSrv.getKataStats().subscribe(
            (stats) => { 
                this.gridOptions.api.addItems(stats);
                this.gridOptions.api.sizeColumnsToFit();
            },
            (err) => { console.log(err); }
        );
    }

}
