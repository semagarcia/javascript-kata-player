import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SettingsRoutes } from './settings.routes';
import { MaterialModule } from './../material/material.module';

import { SettingsComponent } from './settings.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { LpDialogComponent } from './learning-path/lp-dialog/lp-dialog.component';
import { KataComponent } from './kata/kata.component';
import { KataDialogComponent } from './kata/kata-dialog/kata-dialog.component';
import { UsersComponent } from './users/users.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { EventsComponent } from './events/events.component';
import { EventDialogComponent } from './events/event-dialog/event-dialog.component';
import { NumberOfKatasPipe } from './kata/number-of-katas.pipe';
import { LanguagesComponent } from './languages/languages.component';
import { UserNameValidator } from './users/user-dialog/user-dialog-validator.service';

import { AgGridModule } from 'ag-grid-angular/main';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        MaterialModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(SettingsRoutes)
    ],
    declarations: [
        SettingsComponent,
        LearningPathComponent,
        LpDialogComponent,
        KataComponent,
        KataDialogComponent,
        NumberOfKatasPipe,
        UsersComponent,
        UserDialogComponent,
        EventsComponent,
        EventDialogComponent,
        LanguagesComponent
    ],
    exports: [ 
        RouterModule,
        UserDialogComponent
    ],
    providers: [
        UserNameValidator
    ],
    entryComponents: [
        LpDialogComponent,
        KataDialogComponent,
        EventDialogComponent,
        UserDialogComponent
    ]
})
export class SettingsModule { }
