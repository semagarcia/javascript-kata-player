import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

// TODO: refactor to group them with spread operator
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { KataPlayerComponent } from './kata-player/kata-player.component';
import { TrainingComponent } from './training/training.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { LoginComponent } from './login/login.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { StreamingComponent } from './streaming/streaming.component';
import { LeaveChallengeComponent } from './dialogs/leave-challenge/leave-challenge.component';
import { SettingsComponent } from './settings/settings.component';
import { LearningPathComponent } from './settings/learning-path/learning-path.component';
import { KataComponent } from './settings/kata/kata.component';
import { RankingComponent } from './ranking/ranking.component';
import { AboutComponent } from './about/about.component';

import { CreateChallengeDialog, OpenStreamingDialog, SelectTrainingPathDialog, ShowErrorDialog } from './dialogs';
import { ShowErrorService } from './dialogs';
import { TimeElapsedPipe } from './core';
import { ChallengeService, SocketService, TestExecutorService, TrainingService } from './core';

import { CodemirrorModule } from 'ng2-codemirror';
import { AgGridModule } from 'ag-grid-angular/main';
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        IndividualComponent,
        KataPlayerComponent,
        TrainingComponent,
        ChallengeComponent,
        LoginComponent,
        CurrentChallengeListComponent,
        StreamingComponent,
        TimeElapsedPipe,
        CreateChallengeDialog,
        OpenStreamingDialog,
        SelectTrainingPathDialog,
        ShowErrorDialog,
        LeaveChallengeComponent,
        SettingsComponent,
        LearningPathComponent,
        KataComponent,
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
        RouterModule.forRoot(ROUTES),
        AgGridModule.withComponents([])
    ],
    providers: [
        ChallengeService,
        ShowErrorService,
        SocketService,
        TestExecutorService,
        TrainingService
    ],
    entryComponents: [
        CreateChallengeDialog,
        OpenStreamingDialog,
        SelectTrainingPathDialog,
        ShowErrorDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
