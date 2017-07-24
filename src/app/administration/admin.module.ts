import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin.routes';
import { MaterialModule } from './../material/material.module';

import { AdminComponent } from './admin.component';
import { CustomValidators } from './users/user-dialog/user-dialog-validator.service';
import { EventsComponent } from './events/events.component';
import { EventDialogComponent } from './events/event-dialog/event-dialog.component';
import { I18NComponent } from './i18n/i18n.component';
import { LearningPathComponent } from './learning-path/learning-path.component';
import { LpDialogComponent } from './learning-path/lp-dialog/lp-dialog.component';
import { KataComponent } from './kata/kata.component';
import { KataDialogComponent } from './kata/kata-dialog/kata-dialog.component';
import { NumberOfKatasPipe } from './kata/number-of-katas.pipe';
import { ProgrammingLanguagesComponent } from './programming-languages/programming-languages.component';
import { UsersComponent } from './users/users.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';

import { AgGridModule } from 'ag-grid-angular/main';

@NgModule({
    imports: [
        AgGridModule.withComponents([]),
        CommonModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminRoutes)
    ],
    declarations: [
        AdminComponent,
        EventsComponent,
        EventDialogComponent,
        I18NComponent,
        KataComponent,
        KataDialogComponent,
        LearningPathComponent,
        LpDialogComponent,
        NumberOfKatasPipe,
        ProgrammingLanguagesComponent,
        UsersComponent,
        UserDialogComponent
    ],
    exports: [ 
        UserDialogComponent,
        RouterModule
    ],
    providers: [
        CustomValidators
    ],
    entryComponents: [
        EventDialogComponent,
        KataDialogComponent,
        LpDialogComponent,
        UserDialogComponent
    ]
})
export class AdministrationModule { }
