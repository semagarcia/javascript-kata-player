import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { SettingsRoutes } from './settings.routes';

import { SettingsComponent } from './settings.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { LpDialogComponent } from './learning-path/lp-dialog/lp-dialog.component';
import { KataComponent } from './kata/kata.component';
import { KataDialogComponent } from './kata/kata-dialog/kata-dialog.component';

import { AgGridModule } from 'ag-grid-angular/main';
import { NumberOfKatasPipe } from './kata/number-of-katas.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AgGridModule.withComponents([]),
        MaterialModule.forRoot(),
        RouterModule.forChild(SettingsRoutes)
    ],
    declarations: [
        SettingsComponent,
        LearningPathComponent,
        LpDialogComponent,
        KataComponent,
        KataDialogComponent,
        NumberOfKatasPipe
    ],
    exports: [ RouterModule ],
    entryComponents: [
        LpDialogComponent,
        KataDialogComponent
    ]
})
export class SettingsModule { }
