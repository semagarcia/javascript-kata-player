import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

// Modules
import { SettingsModule } from './settings';
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
import { 
    CreateChallengeDialog, OpenStreamingDialog, SelectTrainingPathDialog, 
    ShowErrorDialog, WaitingChallengeDialog
} from './dialogs';
import { ShowErrorService } from './dialogs';
import { TimeElapsedPipe } from './core';
import {
    AuthenticationService, AuthenticationGuard, ChallengeService, EventService, HttpService, IndividualService,
    KataService, LoginService, SocketService, TestExecutorService, TrainingService, UserService, UsersService
} from './core';

// 3rd party libraries
//import { CodemirrorModule } from 'ng2-codemirror-typescript/Codemirror';  // from 'ng2-codemirror';
import { CodemirrorModule } from 'ng2-codemirror';
import { AgGridModule } from 'ag-grid-angular/main';
import 'hammerjs';

export function httpRequestInterceptor(backend: XHRBackend, opts: RequestOptions, authSrv: AuthenticationService, router: Router) { 
    return new HttpService(backend, opts, authSrv, router); 
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        IndividualComponent,
        KataPlayerComponent,
        ChronometerComponent,
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
        RankingComponent,
        AboutComponent,
        WaitingChallengeDialog
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        SettingsModule,
        CodemirrorModule,
        MaterialModule,
        AgGridModule.withComponents([]),
        RouterModule.forRoot(ROUTES)
    ],
    providers: [
        AuthenticationService,
        AuthenticationGuard,
        ChallengeService,
        EventService,
        HttpService,
        IndividualService,
        {
            provide: Http,
            useFactory: httpRequestInterceptor,
            deps: [XHRBackend, RequestOptions, AuthenticationService, Router]    
        },
        KataService,
        LoginService,
        ShowErrorService,
        SocketService,
        TestExecutorService,
        TrainingService,
        UserService,
        UsersService
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
