import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

// Modules
import { AdministrationModule } from './administration/admin.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';

// Routes
import { ROUTES } from './app.routes';

// TODO: refactor to group them with spread operator
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { ChronometerComponent } from './chronometer/chronometer.component';
import { KataPlayerComponent } from './kata-player/kata-player.component';
import { TrainingComponent } from './training/training.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { LoginComponent } from './login/login.component';
import { CurrentChallengeListComponent } from './current-challenge-list/current-challenge-list.component';
import { StreamingComponent } from './streaming/streaming.component';
import { LeaveChallengeComponent } from './dialogs/leave-challenge/leave-challenge.component';
import { RankingComponent } from './ranking/ranking.component';
import { AboutComponent } from './about/about.component';

// Dialogs, Pipes & Services
import { AuthenticationService, HttpService } from './core';
import { ShowErrorService } from './dialogs';
import { 
    CreateChallengeDialog, 
    OpenStreamingDialog, 
    SelectTrainingPathDialog, 
    ShowErrorDialog, 
    WaitingChallengeDialog
} from './dialogs';

// 3rd party libraries
import { CodemirrorModule } from 'ng2-codemirror';
import { AgGridModule } from 'ag-grid-angular/main';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        ChallengeComponent,
        ChronometerComponent,
        CreateChallengeDialog,
        CurrentChallengeListComponent,
        HomeComponent,
        IndividualComponent,
        KataPlayerComponent,
        LoginComponent,
        LeaveChallengeComponent,
        OpenStreamingDialog,
        RankingComponent,
        SelectTrainingPathDialog,
        ShowErrorDialog,
        StreamingComponent,
        TrainingComponent,
        WaitingChallengeDialog
    ],
    imports: [
        AdministrationModule,
        AgGridModule.withComponents([]),
        BrowserModule,
        BrowserAnimationsModule,
        CodemirrorModule,
        CoreModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        Ng2DeviceDetectorModule.forRoot(),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        AuthenticationService,
        ShowErrorService,
    ],
    entryComponents: [
        CreateChallengeDialog,
        OpenStreamingDialog,
        SelectTrainingPathDialog,
        ShowErrorDialog,
        WaitingChallengeDialog
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
