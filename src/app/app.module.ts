import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { TrainingComponent } from './training/training.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { LoginComponent } from './login/login.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { StreamingComponent } from './streaming/streaming.component';
import { LeaveChallengeComponent } from './dialogs/leave-challenge/leave-challenge.component';
import { SettingsComponent } from './settings/settings.component';
import { RankingComponent } from './ranking/ranking.component';
import { AboutComponent } from './about/about.component';

import { CreateChallengeDialog, OpenStreamingDialog, SelectTrainingPathDialog } from './dialogs';
import { TimeElapsedPipe } from './core';
import { ChallengeService, SocketService, TestExecutorService, TrainingService } from './core';

import { CodemirrorModule } from 'ng2-codemirror';
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        IndividualComponent,
        TrainingComponent,
        ChallengeComponent,
        LoginComponent,
        CurrentChallengeListComponent,
        StreamingComponent,
        TimeElapsedPipe,
        CreateChallengeDialog,
        OpenStreamingDialog,
        SelectTrainingPathDialog,
        LeaveChallengeComponent,
        SettingsComponent,
        RankingComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CodemirrorModule,
        MaterialModule.forRoot(),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        ChallengeService,
        SocketService,
        TestExecutorService,
        TrainingService
    ],
    entryComponents: [
        CreateChallengeDialog,
        OpenStreamingDialog,
        SelectTrainingPathDialog,
        LeaveChallengeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
